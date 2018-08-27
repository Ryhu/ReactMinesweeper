import React, { Component } from 'react';
import Tile from '../components/Tile.js'

class Grid extends Component {

  constructor(props){
    super(props)

    this.state={
      height: 5,
      width: 5,
      mines: 14,
      grid: []
    }
  }

  shouldComponentUpdate(){
    this.gridMaker()
  }

  gridMaker(){
    let workingArray = [] //array to work on
    let result = [] //array to push to state
    let empties = (this.state.height * this.state.width) - this.state.mines //empty squares
    //makes mines
    for(let i = 0; i < this.state.mines; i++){
      workingArray.push("*")
    }
    //makes empties
    for(let i = 0; i < empties; i++){
      workingArray.push(" ")
    }
    //shuffle board, mixes mines and empties
    workingArray = this.shuffle(workingArray)

    for(let i = 0; i < this.state.height; i++){
      let curVal = (this.state.height * (i+1))
      let temp = workingArray.slice(curVal - this.state.height, curVal)
      result.push(temp)
    }

    console.log(result)
  }



  //copypasta'd
  shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  // rowMaker(y){
  //   let result = []
  //   for(let x = 0; x < this.state.width; x++){
  //     result.push(this.mineGenerator())
  //   }
  //   return result
  // }
  //
  // mineGenerator(){
  //   let size = this.state.height * this.state.width
  //   let chance = this.state.mines / size //probability is a spelling liability
  //   if (Math.random() < chance){
  //     return "*"
  //   }
  //   else{
  //     return " "
  //   }
  // }



  render() {
    this.gridMaker()
    return <p>hi</p>
  }
}

export default Grid;
