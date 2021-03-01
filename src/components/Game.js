import React, { useState, useRef, useEffect  } from "react";
import { calculateWinner } from "../helper";
import MakeBoard from "./Board";
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection
const Game = () => {
  
  
  const [gameStates, setGameStates] = useState([]); // State variable, list of messages
  const inputRef = useRef(null);
  
  const [boardHistory, setBoardHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(boardHistory[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = boardHistory.slice(0, stepNumber + 1);
    const currentBoard = historyPoint[stepNumber];
    const squares = [...currentBoard];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    setBoardHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
    //update board for multiple browsers
    //#TODO: Multiplayer funcitonality
    if (inputRef != null){
      socket.emit('game', {boardHistory: boardHistory});
      return historyPoint[stepNumber];
    }
  };
   // The function inside useEffect is only run whenever any variable in the array
  // (passed as the second arg to useEffect) changes. Since this array is empty
  // here, then the function will only run once at the very beginning of mounting.
  useEffect((i) => {
    
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('game', (data) => {
    const historyPoint = boardHistory.slice(0, stepNumber + 1);
    const currentBoard = historyPoint[stepNumber];
    const squares = [...currentBoard];
    
    squares[i] = xO;
    setBoardHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
    if (winner || squares[i]) return;
    console.log('Game State Updated!');
    console.log(data);
      // If the server sends a message (on behalf of another client), then we
      // add it to the list of messages to render it on the UI.
    
    socket.emit('game', { boardHistory: boardHistory});
    return data.historyPoint[stepNumber];
    });
  }, []);

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    boardHistory.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <h1>Jaymee's Tic Tac Toe Board</h1>
      <MakeBoard squares={boardHistory[stepNumber]} onClick={handleClick}/>
      <div className="info-wrapper">
        <div>
          <h3>Match History</h3>
          {renderMoves()}
        </div>
        <h3>{winner ? "Winner: " + winner : ""}</h3>
        <h3>{!winner && boardHistory.length===10? "The Game Is a Draw": "Next Player: " + xO}</h3>
      </div>
   </> 
  );
};

export default Game;