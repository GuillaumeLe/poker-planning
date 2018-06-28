import tableReducer from '../tableReducer'
import initialState from '../initialState'
import {PLAY_CARD} from '../../actions/actionTypes'

describe('Table reducer', () => {
  it('should play a specific card', () => {
    const nextState = tableReducer(initialState, {type: PLAY_CARD, card: { value: 1 }})
    expect(nextState.cards.length).toEqual(1)
    expect(nextState.cards[0].value).toEqual(1)
  })
})
