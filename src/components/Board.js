import React, { Component } from 'react';
import Grid from '../components/Grid.js'
import SizeInput from '../components/SizeInput.js'

class Board extends Component {

  constructor(props){
    super(props)

    this.state={
      boardHeight: 0,
      boardWidth: 0,
      mines: 0
    }
  }

  configureBoard(boardHeight, boardWidth, mines){
    this.setState({
      boardHeight: boardHeight,
      boardWidth: boardWidth,
      mines: mines
    })
  }


  render() {
    return (
      <div className="Board">
        <SizeInput></SizeInput>
        <Grid boardHeight={this.state.boardHeight} boardWidth={this.state.boardWidth} mines={this.state.mines}></Grid>
      </div>
    );
  }
}

export default Board;
