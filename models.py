from app import db

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    games_won = db.Column(db.Integer, unique=True, nullable=False)

    def __repr__(self):
        return '<Person %r>' % self.username
      