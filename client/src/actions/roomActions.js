import { Client } from 'colyseus.js'
import * as types from './actionTypes'

export function connectClient () {
  return (dispatch, getState) => {
    try {
      const { user: {username, fullName, selectedBoard} } = getState()
      const client = new Client('ws://poker-planning-app.herokuapp.com:2657')
      dispatch({type: types.SET_CLIENT, client: client})
      const room = client.join('poker', {
        username,
        fullName,
        id: selectedBoard.id,
        token: localStorage.trello_token
      })
      room.onStateChange.add((state) => {
        dispatch(updateRoomState(state))
      })
      dispatch({type: types.SET_ROOM, room: room})
    } catch (err) {
      console.error('Fail to connect', err)
    }
  }
}

export function updateRoomState (roomState) {
  return dispatch => {
    dispatch({type: types.UPDATE_ROOM_STATE, roomState: roomState})
  }
}

export function disconnectClient () {
  return (dispatch, getState) => {
    try {
      const { room: {client, room} } = getState()
      room.leave()
      client.close()

      dispatch({type: types.SET_CLIENT, client: null})
      dispatch({type: types.SET_ROOM, room: null})
    } catch (err) {
      console.error('Fail to disconnect', err)
    }
  }
}
