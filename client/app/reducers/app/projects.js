import { PROJECT } from 'actions/project'

let initialState = {
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PROJECT.FETCH_ALL_SUCCESS:
      return action.payload.reduce((nextState, project) => {
        nextState[project.slug] = project

        return nextState
      }, {})
  }

  return state
}
