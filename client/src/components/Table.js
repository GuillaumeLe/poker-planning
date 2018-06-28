import React, {Component} from 'react'
import Card from './Card'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'

class Table extends Component {
  reset = () => {
    this.props.room.send({ reset: true })
  }

  render () {
    console.log(this.props.roomStatus)
    return (
      <div className='table'>
        {this.props.playedCards.map((card, index) => (
          <Card key={index} value={card.value.toString()} isVisible={this.props.roomStatus === 'ALL_PLAYER_PLAYED'} from={card.from.fullName} />
        ))}
        <Button
          variant='raised'
          color='primary'
          className='button'
          onClick={this.reset}
        >
          Reset
        </Button>
      </div>
    )
  };
}

const mapStateToProps = state => ({
  playedCards: state.room.roomState ? state.room.roomState.cards : [],
  roomStatus: state.room.roomState ? state.room.roomState.status : ''
})

export default connect(
  mapStateToProps
)(Table)
