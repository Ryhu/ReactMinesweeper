import React, { Component } from 'react';
import Tile from '../components/Tile.js'

class Grid extends Component {

  constructor(props){
    super(props)

    this.state={
      height: 10,
      width: 10,
      mines: 14,
      grid: [],
      visibilityGrid: [],
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
    //sets the visibility grid
    let visibility = this.visiblityGridMaker()

    this.setState({
      grid: mineField,
      visibilityGrid: visibility,
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
      if (grid[y][x] === "*"){
        return 1
      }
    }
    return 0
  }
  outOfBoundsCheck(y,x){
    //passing = true
    //checks if tile is within bounds
    if (y < 0 || x < 0 || y >= this.state.height || x >= this.state.width){
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
    for(let i = 0;i<this.state.width;i++){
      row.push(0)
    }
    for(let i = 0;i<this.state.height;i++){
      let newRow = Object.assign({},row)
      result.push(newRow)
    }
    return result
  }

  //fisher-yates shuffle
  shuffle(array) {
    let length = array.length, t, i;
    while (length) {
      i = Math.floor(Math.random() * length--);
      t = array[length];
      array[length] = array[i];
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
    </table>)
  }


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
    vis[y][x] = 1
    this.setState({
      visibilityGrid: vis
    })
    if(this.state.grid[y][x] === " "){
      this.blankHandler(parseInt(y),parseInt(x))
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
      visibilityGrid: vis
    })
  }

  blankHandler(y,x){
  //call blank explosion on selected tile, will store and then reveal an array of blanks if applicable
    let visgrid = Object.assign({}, this.state.visibilityGrid)
    this.blankExplosion(y,x,visgrid)
    this.setState({
      visibilityGrid: visgrid
    })
  }
  blankExplosion(y,x,visgrid){
    //checks all surrounding tiles for validity
    this.blankCheck(y-1,x-1,visgrid)
    this.blankCheck(y-1,x,visgrid)
    this.blankCheck(y-1,x+1,visgrid)
    this.blankCheck(y,x-1,visgrid)
    this.blankCheck(y,x+1,visgrid)
    this.blankCheck(y+1,x-1,visgrid)
    this.blankCheck(y+1,x,visgrid)
    this.blankCheck(y+1,x+1,visgrid)
  }
  blankCheck(y,x,visgrid){
    //if within bounds
    if (this.outOfBoundsCheck(y,x)){
      if(this.state.visibilityGrid[y][x] === 0){
        //sets numbers and blanks to visible
        visgrid[y][x] = 1
        //if blank, continue explosion
        if(this.state.grid[y][x] === " "){
          this.blankExplosion(y,x,visgrid)
        }
      }
    }
  }





  render() {
    return this.displayGrid()
  }
}

export default Grid;
