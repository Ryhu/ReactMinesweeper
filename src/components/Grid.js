import React, { Component } from 'react';
import Tile from '../components/Tile.js'

class Grid extends Component {

  constructor(props){
    super(props)

    this.state={
      tilesLeft: 0,
      grid: [],
      visibilityGrid: [],
    }
  }

  componentDidMount(){
    this.gridMaker()
  }

  gridMaker(){
    //lays mines/empties
    let mineField = this.mineLayer()
    //lays numbers on empties
    mineField = this.numberLayer(mineField)
    //sets the visibility grid
    let visibility = this.visiblityGridMaker()

    let tilesLeft = (this.props.height * this.props.width) - this.props.mines

    this.setState({
      grid: mineField,
      visibilityGrid: visibility,
      tilesLeft: tilesLeft
    })
  }

  mineLayer(){
    let workingArray = [] //array to work on
    let result = []
    let empties = (this.props.height * this.props.width) - this.props.mines //empty squares
    //makes mines
    for(let i = 0; i < this.props.mines; i++){
      workingArray.push("BOOM!")
    }
    //makes empties
    for(let i = 0; i < empties; i++){
      workingArray.push(" ")
    }
    //shuffle board, mixes mines and empties
    workingArray = this.shuffle(workingArray)

    // creates board, changes from 1d to 2d
    for(let i = 0; i < this.props.height; i++){
      let curVal = (this.props.height * (i+1))
      let temp = workingArray.slice(curVal - this.props.height, curVal)
      result.push(temp)
    }

    return result
  }

  numberLayer(grid){
    //loop through the grid, if empty(unmined), then set the number for it
    for(let y = 0; y < this.props.height; y++){
      for(let x = 0; x < this.props.width; x++){
        if(grid[y][x] === " "){
          grid[y][x] = this.tileCounter(y,x,grid)
        }
      }
    }
    return grid
  }
  tileCounter(y,x,grid){
    //checks all 8 surrounding tiles
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
    //checks a single tile
    if (this.outOfBoundsCheck(y,x)){
      if (grid[y][x] === "BOOM!"){
        return 1
      }
    }
    return 0
  }
  outOfBoundsCheck(y,x){
    //passing = true
    //checks if tile is within bounds
    if (y < 0 || x < 0 || y >= this.props.height || x >= this.props.width){
      return false
    }
    else{
      return true
    }
  }

  visiblityGridMaker(){
    // makes the grid that stores visibility status
    let result = []
    let row = []
    for(let i = 0;i<this.props.width;i++){
      row.push(0)
    }
    for(let i = 0;i<this.props.height;i++){
      let newRow = Object.assign({},row)
      result.push(newRow)
    }
    return result
  }

  //fisher-yates shuffle
  shuffle(array) {
    let length = array.length
    let random = 0
    let temp = 0
    while (length) {
      random = Math.floor(Math.random() * length);
      temp = array[length];
      array[length] = array[random];
      array[random] = temp;
      length--
    }
    return array;
  }

  ///VVVVVVVVVVVVVVVVVVVV Click Handler VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
  ///VVVVVVVVVVVVVVVVVVVV Click Handler VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
  ///VVVVVVVVVVVVVVVVVVVV Click Handler VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
  tileClick = (y,x,type) => {
    if(type === "click"){
      this.tileLeftClick(y,x)
    }
    else if(type === "contextmenu"){
      this.tileRightClick(y,x)
    }
  }
  tileLeftClick(y,x){
    let vis = this.state.visibilityGrid
    if (vis[y][x] === 0 ){
      //lose condition
      if(this.state.grid[y][x] === "BOOM!"){
        this.lose()
      }



      //if blank
      if(this.state.grid[y][x] === " "){
        this.blankHandler(parseInt(y),parseInt(x))
      }

      //normal conditions
      else{
        vis[y][x] = 1
        this.setState({
          visibilityGrid: vis,
          tilesLeft: this.state.tilesLeft - 1
        },this.winCheck)
      }
    }
  }
  tileRightClick(y,x){
    let vis = this.state.visibilityGrid

    if(vis[y][x] === "Mine!"){
      vis[y][x] = 0
    }
    else if(vis[y][x] === 0){
      vis[y][x] = "Mine!"
    }

    this.setState({
      visibilityGrid: vis,
    })
  }
  ///^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ///^^^^^^^^^^^^^^^^^^^^ Click Handler ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ///^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  blankHandler(y,x){
  //call blank explosion on selected tile, will store and then reveal an array of blanks if applicable
    let visgrid = Object.assign({}, this.state.visibilityGrid)
    //creates a counter, and sets the clicked blank to visible, and puts the first blank in the counter
    let counter = [1]
    visgrid[y][x] = 1
    this.blankExplosion(y,x,visgrid,counter)
    this.setState({
      visibilityGrid: visgrid,
      tilesLeft: this.state.tilesLeft - counter[0]
    },this.winCheck)
  }
  blankExplosion(y,x,visgrid,counter){
    //checks all surrounding tiles for validity
    this.blankCheck(y-1,x-1,visgrid,counter)
    this.blankCheck(y-1,x,visgrid,counter)
    this.blankCheck(y-1,x+1,visgrid,counter)
    this.blankCheck(y,x-1,visgrid,counter)
    this.blankCheck(y,x+1,visgrid,counter)
    this.blankCheck(y+1,x-1,visgrid,counter)
    this.blankCheck(y+1,x,visgrid,counter)
    this.blankCheck(y+1,x+1,visgrid,counter)
  }
  blankCheck(y,x,visgrid,counter){
    //if within bounds
    if (this.outOfBoundsCheck(y,x)){
      if(this.state.visibilityGrid[y][x] === 0){
        //sets non marked tile to visible, increments counter
        visgrid[y][x] = 1
        counter[0]++
        //if blank, continue explosion
        if(this.state.grid[y][x] === " "){
          this.blankExplosion(y,x,visgrid,counter)
        }
      }
    }
  }

  winCheck(){
    if(this.state.tilesLeft === 0){
      this.win()
    }
  }

  win(){
    setTimeout(function(){
      alert("you win!")
    },200)
  }

  lose(){
    //the delay allows the render to happen
    setTimeout(function(){
      alert("boom! you lose")
    },200)
  }


  reset(){
    this.props.reset()
    //alert(this.state.tilesLeft)
  }

  displayGrid(){
    return(<table id="grid">
      <tbody>
      {this.state.grid.map((i,indexI) => {
        return(
          <tr>
            {i.map((j,indexJ) => {
              let a = this.state.visibilityGrid[indexI][indexJ] === 0 ? null : this.state.grid[indexI][indexJ]
              if (this.state.visibilityGrid[indexI][indexJ] === "Mine!"){
                a = "Mine!"
              }
              return(
                <Tile content={a} coords={"" + indexI + indexJ} action={this.tileClick}/>
              )
            })}
          </tr>
        )
      })}

      </tbody>
      <button id="resetButton" onClick={() => this.reset()}>back to input</button>
    </table>)
  }





  render() {
    return this.displayGrid()
  }
}

export default Grid;
