import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


class Board extends Component {

  static defaultProps = {
    nrows : 5,
    ncols : 5,
    probCellLit: 0.25
  }

  constructor(props) {
    super(props);

    this.state = {
      allCellsOff: false,
      board: this.createBoard()
    }
  }


  createBoard() {
    let board = [];
   
    //create the rows and columns in the board.
    for(let y=0; y<this.props.nrows; y++){
      let row = [];
      for(let x = 0; x < this.props.ncols; x++){
        row.push(Math.random() < this.props.probCellLit) // gives you a value between zero and 1 and check if its lower than the probability 0.25
      }
      board.push(row);
    }

    return board
  }

//flips the cells and check if all the cells are not lit to check if they win
  flipCellsAround(coord) {
    //check if it flips
   // console.log('flipping!', coord);
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board valid, flip it
        
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    //since the game flips the adjacent cells
    flipCell(y,x)
    flipCell(y,x-1);
    flipCell(y,x+1);
    flipCell(y-1,x)
    flipCell(y+1,x)


    let allCellsOff = board.every(row=>row.every(cell=>!cell));

    this.setState({ board: board, allCellsOff: allCellsOff})
    

   
  }


  /** Render game board or winning message. */

  render() {

    

    if(this.state.allCellsOff){
      return alert("You turned it all off!!");
    }


    let tblBoard = [];

    for(let y = 0; y < this.props.nrows; y++){
      let row = [];
      for(let x = 0; x < this.props.ncols; x++){
        let coord= `${y}-${x}`;
        row.push(
        <Cell key={coord} isLit={this.state.board[y][x]}
        flipCellsAroundMe={() => this.flipCellsAround(coord)}
        
        />);
      }

    tblBoard.push(<tr key={y}>{row}</tr>);
    }

    return(

<div>

<div className="header">
<div className="board-title">MindSpace's Lights Out</div>
<div className="board-title-subheader">turn all the blue tiles into grey tiles</div>
</div>
      <table className="Board">
        <tbody>

        {tblBoard}

        </tbody>




      </table>

      </div>
    );
   

  }
}


export default Board;
