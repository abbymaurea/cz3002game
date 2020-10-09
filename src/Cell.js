import React, {Component} from 'react'
import "./Cell.css"
import ButtonPress from "./button_press.mp3"


class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    // call up to the board to flip cells around this cell

    let audio = new Audio(ButtonPress);
    //play the audio everytime the cell was clicked
    audio.play();
    // call flipcellsaroundme to flip the cells.
    this.props.flipCellsAroundMe();
  }

  render() {
    //ternary operation for the cell : it's either lit up or not.
    let classes = "Cell" + (this.props.isLit ? " Cell-lit" : "");

    return (
        <td className={classes} onClick={this.handleClick} />
    )
  }
}


export default Cell