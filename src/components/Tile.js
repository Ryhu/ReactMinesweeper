import React, { Component } from 'react';


class Tile extends Component {

  constructor(props){
    super(props)
  }

  clicked = (e) => {
    e.preventDefault()
    let arr = this.props.coords.split(":")
    let y = arr[0]
    let x = arr[1]
    this.props.action(y,x,e.type)
  }




  render() {
    let name = (this.props.content === null || this.props.content === "P") ? "tile hidden" : "tile"
    return (
      <td className={name} id={this.props.coords} onClick={(e) => this.clicked(e)} onContextMenu={(e) => this.clicked(e)}>
        {this.props.content}
      </td>
    );
  }
}

export default Tile;
