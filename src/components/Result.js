import React, { Component } from "react";
 
export default class Result extends Component {
  render() {

    const { sudoku } = this.props;
    const elapsed = Math.floor(
      (sudoku.solveTime.getTime() - sudoku.startTime.getTime()) / 1000
    );

    return (
      <div>
        <h6>You solved the sudoku in {elapsed} seconds</h6>
      </div>
    );
  }
}
