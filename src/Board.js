import Square from "./square";
import './Board.css';


export const Board = ({ squares, onClick }) => (
  <div className="board">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClinck = {() => onClick(i)} />
    ))}
    </div>
  );
export default Board;


export function MakeBoard(){
  
  return(
<div class="board">
  <div class="box">X</div>
  <div class="box">O</div>
  <div class="box">O</div>
  <div class="box">O</div>
  <div class="box">X</div>
  <div class="box">O</div>
  <div class="box">O</div>
  <div class="box">X</div>
  <div class="box">X</div>
</div>);
}
