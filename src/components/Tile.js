import React, { Component } from 'react';


class Tile extends Component {

  constructor(props){
    super(props)

    this.state={
      symbol: 0
    }
  }


  render() {
    return (
      <td className="tile" id={this.props.coords}>
        {this.props.content}
      </td>
    );
  }
}

export default Tile;
