import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { actions, types, selectors } from 'state/interface'
import * as EditProject from 'views/pages/edit-project'
import { addToast } from 'state/saga/toast'

const watchGetProject = function*() {
  yield take(types.project.GET_FAILED)

  yield all([
    fork(addToast, {
      type: 'error',
      message: 'Cannot connect to project. Project does not exist or network has error(s).'
    }),
    put(
      actions.requestLocation('/projects')
    )
  ])
}

const watchCopyDomainLink = function*() {
  while (true) {
    yield take(types.project.COPY_DOMAIN_LINK)

    yield fork(addToast, {
      expiring: '5s',
      type: 'success',
      message: 'The domain has been copied to clipboard.'
    })
  }
}

const watchUpdateProject = function*(path) {
  while (true) {
    yield take(types.project.UPDATE)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const { updateCompleted, updateFailed } = yield race({
      updateCompleted: take(types.project.UPDATE_COMPLETED),
      updateFailed: take(types.project.UPDATE_FAILED)
    })

    if (updateCompleted) {
      yield fork(addToast, {
        expiring: '5s',
        type: 'success',
        message: 'Your project has been successfully changed.'
      })
    }

    if (updateFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Failed to edit project. Please check your network connection and try again.'
      })
    }

    yield put(
      actions.replaceUIState(path, {
        idle: true
      })
    )
  }
}

const watchRemoveProject = function*(path) {
  while (true) {
    yield take(`${ types.dialog.SHOW }:REMOVE_PROJECT`)

    yield put(
      actions.mergeUIState(path, {
        isRemoveConfirmationDialogActive: true
      })
    )

    const { hide } = yield race({
      hide: take(`${ types.dialog.HIDE }:REMOVE_PROJECT`),
      remove: take(types.project.REMOVE)
    })

    yield put(
      actions.mergeUIState(path, {
        isRemoveConfirmationDialogActive: false
      })
    )

    if (hide) {
      continue
    }

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const { removeCompleted, removeFailed } = yield race({
      removeCompleted: take(types.project.REMOVE_COMPLETED),
      removeFailed: take(types.project.REMOVE_FAILED)
    })

    yield put(
      actions.mergeUIState(path, {
        idle: true
      })
    )

    if (removeCompleted) {
      yield all([
        fork(addToast, {
          expiring: '5s',
          type: 'success',
          message: 'Your project has been successfully deleted. Please wait a minute to finish your change.'
        }),
        put(
          actions.requestLocation('/projects')
        )
      ])
    }

    if (removeFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Failed to delete the project. Please check your network connection and try again.'
      })
    }
  }
}

export default {
  '/projects/:identifier/edit': {
    component: EditProject,
    exact: true,
    *state(path) {
      yield fork(watchCopyDomainLink)
      yield fork(watchUpdateProject, path)
      yield fork(watchGetProject)
      yield fork(watchRemoveProject, path)

      const { identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getProject(identifier)
        ),
        put(
          actions.initializeUIState(path, {
            idle: true,
            isRemoveConfirmationDialogActive: false
          })
        )
      ])
    }
  }
}
