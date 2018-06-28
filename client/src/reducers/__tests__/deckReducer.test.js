import deckReducer from '../deckReducer'
import initialState from '../initialState'
import {SELECT_CARD} from '../../actions/actionTypes'

describe('Deck reducer', () => {
  it('should select the right card', () => {
    const nextState = deckReducer(initialState, {type: SELECT_CARD, card: { value: 1 }})
    expect(nextState.selected).toEqual({value: 1})
  })
})
