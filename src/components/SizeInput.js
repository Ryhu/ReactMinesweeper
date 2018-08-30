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
    this.props.action(this.state.boardHeight, this.state.boardWidth, this.state.mines)
  }

  preSet(height,width,mines){
    this.props.action(height,width,mines)
  }




  render() {
    return (
      <form className="SizeInput" onSubmit={this.submit}>
        Board Height <input type="number" name="boardHeight" onChange={this.setInput}></input><br /><br />
        Board Width<input type="number" name="boardWidth" onChange={this.setInput}></input><br /><br />
        Mines<input type="number" name="mines" onChange={this.setInput}></input><br /><br />
        <input type="submit"></input>

        <button onClick={() => this.preSet(9,9,10)}>Beginner</button>
        <button onClick={() => this.preSet(16,16,40)}>Intermediate</button>
        <button onClick={() => this.preSet(16,30,99)}>Expert</button>
      </form>
    );
  }
}

export default SizeInput;
