import initialState from './initialState'
import {SET_CLIENT, SET_ROOM, UPDATE_ROOM_STATE} from '../actions/actionTypes'

export default function deck (state = initialState.room, action) {
  switch (action.type) {
    case SET_CLIENT:
      return {...state, client: action.client, error: null}
    case SET_ROOM:
      return {...state, room: action.room}
    case UPDATE_ROOM_STATE:
      return {...state, roomState: action.roomState}
    default:
      return state
  }
}
