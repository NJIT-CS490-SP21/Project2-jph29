import React, { useState, useRef, useEffect  } from "react";
import { calculateWinner } from "../helper";
import MakeBoard from "./Board";
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection
const Game = () => {
  
  
  //SETTING GLOBAL USE_STATES, USE_REFS, AND VARIABLES
  const inputRef = useRef(null);
  const [boardHistory, setBoardHistory] = useState([Array(9).fill(null)]);//list of all board instances in a given match
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(boardHistory[stepNumber]);
  const xO = xIsNext ? "X" : "O";
  
  const [userList, setUserList] = useState({'X':'', 'O':'', 'Spectators':[]})
  const userRef = useRef(null)
  const [currUser,setCurrUser] =useState('')
  
  const [userDatabase, setUserDatabase] = useState([])
  
  //LOG_IN FUNCITON
  const updateUsers = () => {
    
    const newList = {...userList} // make a copy of the user list
    const userName = userRef.current.value
    
    if (newList.X === '') {
      console.log('Setting user to X')
      newList.X=userName
      setUserList(newList)//set x to the input user
      
    }
    else if (newList.O === ''){
      console.log('Setting user to O')
      newList.O=userName
      setUserList(newList)//set o to the input user
      
    }
    else {
      console.log('Adding user to Spectator list')
      newList.Spectators = [...newList.Spectators,userName]
      setUserList(newList)//push the input user to the spectator list
     
    }
    setCurrUser(userName)
    socket.emit('logIn', {newUsers: newList,userName:userName})
    console.log(userRef.current.value)
    console.log(userList)
    //#TODO: 
  };
  
  //ON_CLICK FUNCTION WHICH HANDLES ALL BOARD CLICKS
  const handleClick = (i) => {
    const historyPoint = boardHistory.slice(0, stepNumber + 1);
    const currentBoard = historyPoint[stepNumber];//grabs the current board
    const boardCopy = [...currentBoard];// makes a copy of the current board
    // return if won or occupied
    if (winner || boardCopy[i]) return;
    // select square
    boardCopy[i] = xO;//replaces blank square with either an X or an O
    setBoardHistory([...historyPoint, boardCopy]);//appends the list of board instances with the current board configuration
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
    
    console.log('Game State Updated!');
    console.log(boardHistory)
    console.log(currentBoard)
    console.log(xO)

    if (inputRef != null){
      socket.emit('game', {boardHistory: boardHistory, boardCopy:boardCopy /*current board*/, i:i /*index*/,xO:xO,historyPoint:historyPoint,xNext:!xIsNext});
      
      return boardCopy;
    }
  };
  //USE EFFECT FUNCTION DO DISPLAY USERS NAME ACROSS SEVERAL BROWSERS
  useEffect(() => {
    socket.on('logIn', (data) => {
      const userList = data.newUsers
      setUserList(userList)
      //console.log(data)
      console.log(userList)
      //console.log(setUserList)
    })
  })
  
  //USE EFFECT FUNCTION HANDLES MULTIPLAYER FUNCTIONALITY;  
  useEffect(() => {
    socket.on('game', (data) => {
    const historyPoint = data.historyPoint;// TODO:fix history point . length
    
    const boardCopy = data.boardCopy;
    const i = data.i;
    setBoardHistory([...historyPoint,boardCopy])
    setStepNumber(data.historyPoint.length);
    setXisNext(data.xNext);
    if (winner || boardCopy[i]) return;
    
    });
  }, []);
  //USE EFFECT FUNCTION TO DISPLAY LEADERBOARD
  useEffect(()=> {
    socket.on('userList', (data) => {
      console.log('userList event received!')
      //databaseCopy = [...userDatabase]
      setUserDatabase(data['users'])
      console.log(data)
      console.log(userDatabase)
      
    });
  }, []);

  //HELPER FUNCITON FOR RENDER MOVES
  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };
  //FUNCTION TO MAP BOARD INSTANCES TO MOVES; ALLOWING USERS TO EITHER RESET THE MATCH OR "JUMP" TO A SPECIFIC BOARD INSTANCE
  const renderMoves = () =>
    boardHistory.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Restart";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });
  console.log(userList)
  return (
    <>
      <h1>Jaymee's Tic Tac Toe Board</h1>
      <div>
      <div>{currUser === '' ?<div> Enter username here:  <input ref={userRef} type="text" /> 
      <button onClick={updateUsers}>Submit</button></div>
      :<div><h2>{winner ? "Winner: " + winner : ""}
        <h4>{!winner && boardHistory.length===10? "The Game Is a Draw": "Next Player: " + xO}</h4></h2><MakeBoard squares={boardHistory[stepNumber]} onClick={handleClick}/> 
        <div className="info-wrapper">
          <div>
           <h3>Match History</h3>
           {renderMoves()}
          </div>
          <div>
          <h3>All Users (History)</h3>
          <button >Show Leaderboard </button>
          </div>
        </div>
      </div>
        
      }
      
      </div>
      </div>
      
   </> 
  );
};

export default Game;