import React, { Component } from 'react';


class SizeInput extends Component {

  constructor(props){
    super(props)

    this.state = {
      boardHeight: 0,
      boardWidth: 0,
      mines: 0
    }
  }


  setInput = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  submit = (e) => {
    e.preventDefault()
    alert(this.state.boardHeight)
  }


  render() {
    return (
      <form className="SizeInput" onSubmit={this.submit}>
        <p>Board Height</p>
        <input type="number" name="boardHeight" onChange={this.setInput}></input>
        <p>Board Width</p>
        <input type="number" name="boardWidth" onChange={this.setInput}></input>
        <p>Mines</p>
        <input type="number" name="mines" onChange={this.setInput}></input>
        {this.state.boardHeight}{this.state.boardWidth}{this.state.mines}
        <input type="submit"></input>
      </form>
    );
  }
}

export default SizeInput;
