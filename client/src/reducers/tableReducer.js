import initialState from './initialState'
import {PLAY_CARD} from '../actions/actionTypes'

export default function table (state = initialState.table, action) {
  switch (action.type) {
    case PLAY_CARD:
      return {...state, cards: [action.card]}
    default:
      return state
  }
}
