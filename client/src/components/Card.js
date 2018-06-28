import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    width: 160,
    height: 225,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.5s'
  },
  title: {
    fontSize: 50
  },
  from: {
    fontSize: 15
  }
}

class SimpleCard extends Component {
  render () {
    const { value, isVisible, from } = this.props
    return (
      <div style={{margin: 10}}>
        <Card
          style={!this.props.selected
            ? styles.card
            : {
              ...styles.card,
              transform: 'translate(0px, -20%)'
            }}
          onClick={this.props.onClick}
        >
          <CardContent>
            <Typography style={styles.title} color='textSecondary'>
              {isVisible && (value)}
            </Typography>
            <Typography style={styles.from} color='textSecondary'>
              {isVisible && (from)}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

SimpleCard.propTypes = {
  value: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired
}

export default SimpleCard
