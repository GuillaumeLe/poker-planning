import * as types from './actionTypes';

export function playCard(value) {
  return dispatch => {
    return dispatch({type: types.PLAY_CARD, card: value})
  };
}
