import React, { Component } from 'react'
import Card from './Card'
import {connect} from 'react-redux'
import {selectCard} from '../actions/deckActions'
import { playCard } from '../actions/tableActions'
import Button from '@material-ui/core/Button'

class Deck extends Component {
  render () {
    return (
      <div className='deck'>
        <div className='cards'>
          {this.props.availableCards.map(value => (
            <Card
              key={value}
              value={value.toString()}
              isVisible
              onClick={() => this.props.selectCard(value)}
              selected={value === this.props.selectedCard}
            />
          ))}
        </div>
        <div className='buttonContainer'>
          <Button
            variant='raised'
            color='primary'
            className='button'
            onClick={() => {
              this.props.playCard(this.props.selectedCard)
              this.props.onCardPlayed(this.props.selectedCard)
            }}
          >
            Play
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  availableCards: state.deck.cards,
  selectedCard: state.deck.selected
})

const mapDispatchToProps = dispatch => ({
  selectCard: value => dispatch(selectCard(value)),
  playCard: value => dispatch(playCard(value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck)
