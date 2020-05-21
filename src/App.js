import React, { Component } from "react";
import { generateSudoku, checkSolution} from "./lib/sudoku";
import produce from "immer";
import SudokuBoard from "./components/SudokuBoard";
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: generateSudoku()
    }));
  }

  handleChange = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows[e.row].cols[e.col].value = e.value;
        if (!state.sudoku.solvedTime) {
          const solved = checkSolution(state.sudoku);
          if (solved) {
            state.sudoku.solveTime = new Date();
          }
        }
      })
    );
  };

  newSudoku = e => {
    this.setState( produce({}, () => ({
      sudoku: generateSudoku()
    })));
  }

  solveSudoku = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows.forEach(row =>
          row.cols.forEach(col => {
            col.value = state.sudoku.solution[col.row * 9 + col.col];
          })
        );
      })
    );
  };
   
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Lets play</h1>
        </header>
        <SudokuBoard sudoku={this.state.sudoku} onChange={this.handleChange}/>
        <button onClick={this.solveSudoku}>Solve it</button>
        <button onClick={this.newSudoku}>New one</button>
      </div>
    );
  }
}
export default App;
