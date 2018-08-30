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

  configureBoard = (boardHeight, boardWidth, mines) => {
    this.setState({
      boardHeight: boardHeight,
      boardWidth: boardWidth,
      mines: mines
    })
  }

  debug(){
    debugger
  }

  displaySwitcher(){
    return this.state.mines === 0 ? <SizeInput action={this.configureBoard}></SizeInput> : <Grid height={this.state.boardHeight} width={this.state.boardWidth} mines={this.state.mines}></Grid>
  }

  reset = () => {
    this.setState({
      mines: 0
    })
  }


  render() {
    return (
      <div className="Board">
        {this.displaySwitcher()}
        <button onClick={this.reset}>true reset</button>
      </div>
    );
  }
}

export default Board;
