"""
Back-End file that communicates with Postgress-Database, and listens/emits socket data
"""

import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
import models
load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')
# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)

# IMPORTANT: This must be AFTER creating DB variable to prevent
# circular import issues

DB.create_all()

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})

SOCKETIO = SocketIO(
    APP,
    CORS_allowed_origins="*",
    json=json,
    manage_session=False
)

@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    '''Function to build the filename'''
    return send_from_directory('./build', filename)

@SOCKETIO.on('connect')
def on_connect():
    '''Function to show that a user has connected'''
    print('User connected!')

@SOCKETIO.on('disconnect')
def on_disconnect():
    '''Function to show that a user has disconnected'''
    print('User disconnected!')

@SOCKETIO.on('game')
def on_chat(data):
    '''Function to show that the game state has been updated'''
    print(str(data))
    SOCKETIO.emit('game', data, broadcast=True, include_self=False)

@SOCKETIO.on('logIn')
def on_log(data):
    '''Function to show that a user has logged in'''
    print(str(data))
    exists = DB.session.query(DB.exists().where(models.Gamer.username == data['userName'])).scalar()
    if not exists:
        new_user = models.Gamer(username=data['userName'], gameswon=0)
        DB.session.add(new_user)
        DB.session.commit()
    all_scores = DB.session.query(models.Gamer).order_by(models.Gamer.gameswon.desc()).all()
    users = []
    white_space = '             '
    for person in all_scores:
        users.append(person.username + white_space + str(person.gameswon))
    print(users)
    print(all_scores)
    SOCKETIO.emit('logIn', data, broadcast=True, include_self=False)
    SOCKETIO.emit('userList', {'users':users})

@SOCKETIO.on('winner')
def on_win(data):
    '''Function to increment winners score and send latest database to app'''
    print('WIN EVENT RECIEVED!')
    print(str(data))
    Winner = DB.session.query(models.Gamer).filter_by(username=data['winner']).first()
    Winner.gameswon = Winner.gameswon + 1
    DB.session.commit()
    all_scores = DB.session.query(models.Gamer).order_by(models.Gamer.gameswon.desc()).all()
    users = []
    white_space = '             '
    for person in all_scores:
        users.append(person.username + white_space + str(person.gameswon))
    SOCKETIO.emit('userList', {'users':users})
    # Note that we don't call App.run anymore. We call SOCKETIO.run with App arg
if __name__ == "__main__":
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
    