import { render, screen, fireEvent } from '@testing-library/react';
import Game from './Game';
/*
JEST UNIT TEST FOR CLIENT-SIDE APPLICATION
    1. 3 REACT COMPONENT TESTS
    2. Each test should have 2+ assert statements and pass when ran
    3. Flows to test:
        Login flow - does the board only show up after logging in
        Board clicking - does an X or O show up on the correct square after clicking
        Props changing - if the props for a component change, does the HTML update automatically?
*/


test("Login button disappears", () => {
    render(<Game />);
    
    const joinButtonElement = screen.getByText('Submit')
    //expect(joinButtonElement).toBeInTheDocument();
    
    fireEvent.click(joinButtonElement);
    //expect(joinButtonElement).toBeInTheDocument();
});


test("Turn Changes", () => {
    const boardElement = screen.getByRole('MakeBoard', );
    
    const xPlayerElement = screen.getByText("Next Player X");
   expect(xPlayerElement).toBeInTheDocument();
   fireEvent.click(boardElement)
   const oPlayerElement = screen.getByText('Next Player: O');
   expect(oPlayerElement).toBeInTheDocument();
    
});

test("Show Leaderboard", () => {
    const leaderBoardElement = screen.getByText("Show Leaderboard");
    expect(leaderBoardElement).toBeInTheDocument;
    fireEvent.click(leaderBoardElement);
    expect(leaderBoardElement).not.toBeInTheDocument;
});