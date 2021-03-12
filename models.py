from app import db

class Gamer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    gameswon = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Gamer %r>' % self.username
      