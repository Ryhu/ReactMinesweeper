import React, { Component } from 'react';


class MineCounter extends Component {

  constructor(props){
    super(props)

  }


  render() {
    return (
      <div className="MineCounter headerPart">
        <p>Mines</p>
        <p>{this.props.minesLeft}</p>
      </div>
    );
  }
}

export default MineCounter;
