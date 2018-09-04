import React, { Component } from 'react';


class Timer extends Component {

  constructor(props){
    super(props)

  }


  render() {
    return (
      <div className="Timer">
        <p>{this.props.time}</p>
      </div>
    );
  }
}

export default Timer;
