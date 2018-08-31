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
    this.starterGridMaker()
  }

  starterGridMaker(){
    let visibility = this.visiblityGridMaker()
    this.setState({
      grid: visibility,
      visibilityGrid: visibility,
    })
  }

  gridMaker(y,x){
    //lays mines/empties
    let mineField = this.mineLayer(y,x)
    //lays numbers on empties
    mineField = this.numberLayer(mineField)
    //sets the visibility grid
    let visibility = this.visiblityGridMaker()

    let tilesLeft = (this.props.height * this.props.width) - this.props.mines
    
    this.setState({
      grid: mineField,
      visibilityGrid: visibility,
      tilesLeft: tilesLeft
    },() => {this.blankHandler(y,x)})
  }

  mineLayer(y,x){
    let workingArray = [] //array to work on
    let result = []
    let setAside = []
    // this
    this.setAsideHelper(y-1,x-1,setAside)
    this.setAsideHelper(y-1,x,setAside)
    this.setAsideHelper(y-1,x+1,setAside)
    this.setAsideHelper(y,x-1,setAside)
    this.setAsideHelper(y,x,setAside)
    this.setAsideHelper(y,x+1,setAside)
    this.setAsideHelper(y+1,x-1,setAside)
    this.setAsideHelper(y+1,x,setAside)
    this.setAsideHelper(y+1,x+1,setAside)

    let empties = (this.props.height * this.props.width) - this.props.mines - setAside.length//empty squares

    //makes mines
    for(let mines = 0; mines < this.props.mines; mines++){
      workingArray.push("*")
    }
    //makes empties
    for(let empty = 0; empty< empties; empty++){
      workingArray.push(" ")
    }
    //shuffle board, mixes mines and empties
    workingArray = this.shuffle(workingArray)

    //puts the setAside pieces back in
    // logic as follows:
    // for each element in setAside:
    // example - height:5, width:6
    // take the first number: [1,2] => 1
    // that will be the number of elements you skip, times width.
    // so 1 => 6,
    // then the skip the next tiles, n == second number == 2
    // so 6 => 8
    // ISSUE: items in the array are might not be added in order, [4,4],
    // if added before [3,4] will throw off formula
    // Solution: items are added into the array based on how early they will
    // be hit in the 2d making process
    for(let i = 0;i<setAside.length;i++){
      let counter = 0
      counter += setAside[i][0] * this.props.width
      counter += setAside[i][1]
      workingArray.splice(counter,0," ")
    }
    // creates board, changes from 1d to 2d
    for(let i = 0; i < this.props.height; i++){
      let curVal = (this.props.width * (i+1))
      let temp = workingArray.slice(curVal - this.props.width, curVal)
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
      if (grid[y][x] === "*"){
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
  setAsideHelper(y,x,arr){
    if(this.outOfBoundsCheck(y,x)){
      arr.push([y,x])
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
      let newRow = row.slice()
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
      random = Math.floor(Math.random() * length--);
      temp = array[length];
      array[length] = array[random];
      array[random] = temp;
    }
    return array;
  }

  ///VVVVVVVVVVVVVVVVVVVV Click Handler VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
  ///VVVVVVVVVVVVVVVVVVVV Click Handler VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
  ///VVVVVVVVVVVVVVVVVVVV Click Handler VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

  tileClick = (y,x,type) => {
    y = parseInt(y)
    x = parseInt(x)
    if (this.state.grid[y][x] === 0){
      this.firstMove(y,x)
    }
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
      if(this.state.grid[y][x] === "*"){
        this.lose()
      }

      //if blank
      if(this.state.grid[y][x] === " "){
        this.blankHandler(y,x)
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

    if(vis[y][x] === "P"){
      vis[y][x] = 0
    }
    else if(vis[y][x] === 0){
      vis[y][x] = "P"
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


  firstMove(y,x){
    let xMax = this.state.width - 1
    let yMax = this.state.height - 1
    this.gridMaker(y,x)
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
      alert(" you lose")
    },200)
  }


  reset(){
    // this.props.reset()
    debugger
    //alert(this.state.tilesLeft)
  }

  displayGrid(){
    return(<div>
      <table id="grid">
      <tbody>
      {this.state.grid.map((i,indexI) => {
        return(
          <tr>
            {i.map((j,indexJ) => {
              let a = this.state.visibilityGrid[indexI][indexJ] === 0 ? null : this.state.grid[indexI][indexJ]
              if (this.state.visibilityGrid[indexI][indexJ] === "P"){
                a = "P"
              }
              return(
                <Tile content={a} coords={indexI + ":" + indexJ} action={this.tileClick}/>
              )
            })}
          </tr>
        )
      })}

      </tbody>
    </table>
    <button id="resetButton" onClick={() => this.reset()}>back to input</button>
    </div>)
  }





  render() {
    return this.displayGrid()
  }
}

export default Grid;
