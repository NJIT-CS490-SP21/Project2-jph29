# Flask and create-react-app

##Clone the repo

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
1. Currently does not support multiple players across browsers. I will address this by returning to the chat app and applying the same live process to the tic tac toe app.
2. App currently does not support user log in, I will address this by taking more time to research conditional rendering and useStates.

##Technicle Issues
1. At the beginning of the project, I could not get the board to render properly in a clickable format. I addressed this by researching the react functionalities, and stumbling upon reacts own guide for tic tac toe (using classes)
2. I couldn't get the game logic to funciton properly (win conditions). I fixed this through the react hooks tutorial on how to pass the gamestate back to my win conditions file.