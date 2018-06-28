import initialState from './initialState'
import {SET_USERNAME, SET_FULL_NAME, SELECT_BOARD} from '../actions/actionTypes'

export default function table (state = initialState.user, action) {
  switch (action.type) {
    case SET_USERNAME:
      return {...state, username: action.username}
    case SET_FULL_NAME:
      return {...state, fullName: action.fullName}
    case SELECT_BOARD:
      return {...state, selectedBoard: action.board}
    default:
      return state
  }
}
