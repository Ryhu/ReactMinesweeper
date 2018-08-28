import React, { Component } from 'react';


class Tile extends Component {

  constructor(props){
    super(props)

    this.state={
      symbol: 0
    }
  }

  clicked = () => {
    this.props.action(this.props.coords[0],this.props.coords[1])
  }




  render() {
    let name = this.props.content === null ? "tile hidden" : "tile"
    return (
      <td className={name} id={this.props.coords} onClick={() => this.clicked()}>
        {this.props.content}
      </td>
    );
  }
}

export default Tile;
