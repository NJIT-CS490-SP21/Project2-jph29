import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./build/static')
# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
import models
db.create_all()

cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('game')
def on_chat(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the game event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('game',  data, broadcast=True, include_self=False)

@socketio.on('logIn')
def on_log(data):
    print(str(data))
    exists = db.session.query(db.exists().where(models.Gamer.username == data['userName'])).scalar()
    if not exists:
        new_user = models.Gamer(username=data['userName'], gameswon=0)
        db.session.add(new_user)
        db.session.commit()
    #all_people = models.Gamer.query.all()
    all_scores = db.session.query(models.Gamer).order_by(models.Gamer.gameswon.desc()).all()
    users = []
    white_space = '             '
   
    for person in all_scores:
        users.append(person.username + white_space + str(person.gameswon))
    #print(models.Gamer)
    print(users)
    print(all_scores)
    #print(exists)
    #socketio.emit('logIn', data, broadcast=True, include_self=False)
    socketio.emit('userList',{'users':users})
    
# Note that we don't call app.run anymore. We call socketio.run with app arg
if __name__ == "__main__":
    socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )