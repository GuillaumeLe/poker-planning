import React, { Component } from 'react'
import Deck from '../components/Deck'
import Table from '../components/Table'
import StatusWindow from '../components/StatusWindow'
import {connect} from 'react-redux'
import {connectClient, disconnectClient} from '../actions/roomActions'

class Main extends Component {
  playCard (card) {
    this.props.room.send({ card: { value: card } })
  }

  componentDidMount () {
    this.props.connectClient()
  }

  componentWillUnmount () {
    this.props.disconnectClient()
  }

  render () {
    return (
      <div className='App'>
        <Table room={this.props.room} />
        <Deck onCardPlayed={(card) => this.playCard(card)} />
        <StatusWindow
          players={this.props.roomState ? Object.values(this.props.roomState.players) : []}
          roomName={this.props.selectedBoard.name}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  client: state.room.client,
  room: state.room.room,
  roomState: state.room.roomState,
  selectedBoard: state.user.selectedBoard
})

const mapDispatchToProps = dispatch => ({
  connectClient: () => dispatch(connectClient()),
  disconnectClient: () => dispatch(disconnectClient())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
