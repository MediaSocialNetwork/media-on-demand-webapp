import delay from 'delay'
import { call, fork, put, select, take } from 'redux-saga/effects'
import permissionChecker from 'services/permission-checker'
import { actions, selectors, types } from 'state/interface'

const loop = function*() {
  while (true) {
    const request = yield take(types['LOCATION/REQUEST'])

    const pathname = request.payload.pathname

    try {
      if (pathname === '/splash') {
        throw new Error('Invalid pathname')
      }

      const isSignedIn = yield select(selectors.isSignedIn)
      const checker = permissionChecker(isSignedIn)

      if (!checker(pathname)) {
        yield fork(put, actions.acceptLocation(
            isSignedIn ? '/' : '/sign-in'
          )
        )

        continue
      }

      // TODO call API to check permission here
      yield fork(put, actions.acceptLocation(pathname))
    } catch (error) {
      yield fork(put, actions.rejectLocation(pathname, error))
    }
  }
}

export default function*() {
  yield fork(loop)

  const initAction = yield take(types['LOCATION/INIT'])

  yield put(actions.requestLocation(initAction.payload.pathname))

  yield put({
    type: '@@INITIALIZED'
  })
}
