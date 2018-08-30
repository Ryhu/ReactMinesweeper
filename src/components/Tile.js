import React, { Component } from 'react';


class Tile extends Component {

  constructor(props){
    super(props)
  }

  clicked = (e) => {
    e.preventDefault()
    this.props.action(this.props.coords[0],this.props.coords[1],e.type)
  }




  render() {
    let name = (this.props.content === null || this.props.content === "Mine!") ? "tile hidden" : "tile"
    return (
      <td className={name} id={this.props.coords} onClick={(e) => this.clicked(e)} onContextMenu={(e) => this.clicked(e)}>
        {this.props.content}
      </td>
    );
  }
}

export default Tile;
