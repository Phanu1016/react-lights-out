import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let row = 0; row < nrows; row++) {
      let r = []
      for (let col = 0; col < ncols; col++) {
        r.push(Math.random() < chanceLightStartsOn)
      }
      initialBoard.push(r)
    }
    return initialBoard
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every( (row) => row.every( (cell) => cell === false ? true : false) )
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copiedBoard = oldBoard.map( (row) => [...row])

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, copiedBoard)

      flipCell(y + 1, x, copiedBoard)
      flipCell(y - 1, x, copiedBoard)

      flipCell(y, x + 1, copiedBoard)
      flipCell(y, x - 1, copiedBoard)


      // TODO: return the copy
      return copiedBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) { return <p>You won.</p> }

  // make table board

  // TODO
  let tableBoard = []
  for (let row = 0; row < nrows; row++){
    let r = []
    for (let col = 0; col < ncols; col++){
      let coord = `${row}-${col}`
      r.push(
        <Cell
          key={coord} // 0-1, 0-2, 0-3, 1-0 ..
          isLit={board[row][col]} // T/F
          flipCellsAroundMe={ () => flipCellsAround(coord) }
        />
      )
    }
    tableBoard.push(<tr key={row}>{r}</tr>)
  }

  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  )

}

export default Board;
