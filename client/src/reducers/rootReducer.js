import {combineReducers} from 'redux'
import deck from './deckReducer'
import table from './tableReducer'
import room from './socketRoomReducer'
import user from './userReducer'

const rootReducer = combineReducers({
  deck,
  table,
  room,
  user
})

export default rootReducer
