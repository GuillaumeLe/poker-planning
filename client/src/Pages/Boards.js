import React, { Component } from 'react';
import {connect} from 'react-redux';
import {selectBoard} from '../actions/userActions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import filter from 'lodash/filter';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
  root: {
    color: 'white',
  },
  select: {
    color: 'white',
    marginTop: 10,
  },
  selectMenu: {
    color: 'white'
  },
  icon: {
    color: 'white'
  },
  selectWrapper: {
    width: 200,
    borderBottom: '1px solid white',
  }
}
class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      selectedBoard: props.selectedBoard.name || '',
    }
  }

  componentDidMount () {
    window.Trello.get(
      '/member/me/boards',
      (res) => {
        this.setState({boards: res})
      },
      (err) => {
        console.log(err)
      });
  }

  handleChange = event => {
    this.setState({ selectedBoard: event.target.value });
    this.props.selectBoard(filter(this.state.boards, (board) => board.name === event.target.value)[0])
    
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="boards">
        <Select
          value={this.state.selectedBoard}
          onChange={this.handleChange}
          style={styles.selectWrapper}
          classes={classes}
        >
          {this.state.boards.map((board)=>(
            <MenuItem key={board.id} value={board.name}>{board.name}</MenuItem>
          ))}
        </Select>

        <Button 
          variant="contained"
          onClick={() => {
            if(this.props.selectedBoard.id)
              window.location.hash = '#/'
          }}
        >
          Go
        </Button>
      </div>
    );
  }
}

Boards.propTypes = {
  selectedBoard: PropTypes.object,
  selectBoard: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  selectedBoard: state.user.selectedBoard,
});

const mapDispatchToProps = dispatch => ({
  selectBoard: (board) => dispatch(selectBoard(board)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Boards));
