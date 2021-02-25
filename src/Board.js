import './Board.css';
import { Square } from './square.js';
export function MakeBoard(){
  function renderSquare(i){
    return <Square value={this.props.square[i]} 
          onClick={()=>this.props.squares(i)}
    />
  }
  
  function render(){
    return(
      <div>
        <div className="border-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="border-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="border-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      
      </div>
    );
  }
  
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


