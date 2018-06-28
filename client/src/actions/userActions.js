import * as types from './actionTypes'

export function setUser (username, fullName) {
  return dispatch => {
    dispatch({type: types.SET_USERNAME, username: username})
    dispatch({type: types.SET_FULL_NAME, fullName: fullName})
  }
}

export function selectBoard (board) {
  return dispatch => {
    dispatch({type: types.SELECT_BOARD, board})
  }
}
