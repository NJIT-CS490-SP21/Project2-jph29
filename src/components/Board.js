import React from "react";
import Square from "./Square";
//passes back to square
const MakeBoard = ({ squares, onClick }) => (
  <div className="board">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

export default MakeBoard;
