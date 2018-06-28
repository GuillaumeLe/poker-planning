import initialState from './initialState'
import {SELECT_CARD} from '../actions/actionTypes'

export default function deck (state = initialState.deck, action) {
  switch (action.type) {
    case SELECT_CARD:
      return {...state, selected: action.card}
    default:
      return state
  }
}
