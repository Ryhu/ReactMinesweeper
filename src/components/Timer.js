import React, { Component } from 'react';


class Timer extends Component {

  constructor(props){
    super(props)

  }


  render() {
    return (
      <div className="Timer headerPart">
        <p className="partText">Time:</p>
        <p className="partNumber">{this.props.time}</p>
      </div>
    );
  }
}

export default Timer;
