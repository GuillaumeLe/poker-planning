import React, {Component} from 'react'
import PropTypes from 'prop-types'

class StatusWindow extends Component {
  render () {
    const { players, roomName } = this.props
    return (
      <div>
        <h4>{roomName}</h4>
        { players && players.map(player => (
          <p key={player.username}>{player.fullName}</p>
        ))}
      </div>
    )
  }
}

StatusWindow.propTypes = {
  players: PropTypes.array,
  roomName: PropTypes.string.isRequired
}

export default StatusWindow
