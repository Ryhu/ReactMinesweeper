import React, { Component } from 'react';
import Tile from '../components/Tile.js'

class Grid extends Component {

  constructor(props){
    super(props)

    this.state={
      height: 10,
      width: 10,
      mines: 14,
      grid: []
    }
  }

  // shouldComponentUpdate(){
  //   this.gridMaker()
  // }

  componentDidMount(){
    this.gridMaker()
  }

  gridMaker(){
    //lays mines/empties
    let mineField = this.mineLayer()
    //lays numbers on empties
    mineField = this.numberLayer(mineField)

    this.setState({
      grid: mineField
    })
  }

  mineLayer(){
    let workingArray = [] //array to work on
    let result = []
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

    // creates board, changes from 1d to 2d
    for(let i = 0; i < this.state.height; i++){
      let curVal = (this.state.height * (i+1))
      let temp = workingArray.slice(curVal - this.state.height, curVal)
      result.push(temp)
    }

    return result
  }

  numberLayer(grid){
    //loop through the grid, if empty(unmined), then set the number for it
    for(let y = 0; y < this.state.height; y++){
      for(let x = 0; x < this.state.width; x++){
        if(grid[y][x] === " "){
          grid[y][x] = this.tileCounter(y,x,grid)
        }
      }
    }
    return grid
  }


  tileCounter(y,x,grid){
    let result = 0
    result += this.tileChecker(y-1,x-1,grid)
    result += this.tileChecker(y-1,x,grid)
    result += this.tileChecker(y-1,x+1,grid)
    result += this.tileChecker(y,x-1,grid)
    result += this.tileChecker(y,x+1,grid)
    result += this.tileChecker(y+1,x-1,grid)
    result += this.tileChecker(y+1,x,grid)
    result += this.tileChecker(y+1,x+1,grid)
    if(result === 0){
      return " "
    }
    else{
      return result.toString()
    }
  }

  tileChecker(y,x,grid){
    if (this.outOfBoundsCheck(y,x)){
      if (grid[y][x] === "*"){
        return 1
      }
    }
    return 0
  }

  outOfBoundsCheck(y,x){
    if (y < 0 || x < 0 || y >= this.state.height || x >= this.state.width){
      return false
    }
    else{
      return true
    }
  }

  //copypasta'd, fisher-yates shuffle
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

  displayGrid(){
    return(<table className="grid">
    <tbody>
      {this.state.grid.map((i,indexI) => {
        return(
          <tr>
            {i.map((j,indexJ) => {
              let a = this.state.grid[indexI][indexJ]
              return(
                <Tile content={a}/>
              )
            })}
          </tr>
        )
      })}

</tbody>
    </table>)
  }





  render() {
    return this.displayGrid()
  }
}

export default Grid;
