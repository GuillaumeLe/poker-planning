import * as types from './actionTypes'

export function selectCard (value) {
  return dispatch => {
    return dispatch({type: types.SELECT_CARD, card: value})
  }
}
