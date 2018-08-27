import React, { Component } from 'react';
import Tile from '../components/Tile.js'

class Grid extends Component {

  constructor(props){
    super(props)

    this.state={
      height: 0,
      width: 0,
      mines: 0,
    }
  }


  render() {
    return (
      <div className="Grid">
        <Tile />
      </div>
    );
  }
}

export default Grid;
