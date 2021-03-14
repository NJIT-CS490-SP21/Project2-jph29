''' Module to set database columns'''
from app import DB


class Gamer(DB.Model):
    '''class sets table columns'''
    id = DB.Column(DB.Integer, primary_key=True)
    username = DB.Column(DB.String(80), unique=True, nullable=False)
    gameswon = DB.Column(DB.Integer, nullable=False)

    def __repr__(self):
        return '<Gamer %r>' % self.username
