#Link to Deployed App: jaymee-tictactoe.herokuapp.com 
# Flask and create-react-app

## Requirements

1. `npm install`
2. `pip install -r requirements.txt`

## Setup

1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application

1. Run command in terminal: `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Known Problems

1. Users name is currently not highlighted on the leaderboard.

##Technicle Issues

1. At the beginning of the project, I could not get the board to render properly in a clickable format. I addressed this by researching the react functionalities, and stumbling upon reacts own guide for tic tac toe (using classes)
2. I couldn't get the game logic to funciton properly (win conditions). I fixed this through the react hooks tutorial on how to pass the gamestate back to my win conditions file.
3. At the beginning of milestone 2, My app did not have proper database persistence, where I could not get tables to be set nor add new users. I fixed this by researching the sql alchemy documentation.
