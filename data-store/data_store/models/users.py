from data_store.models.base import Base
import sqlalchemy as sql


class Users(Base):
    __tablename__ = "users"
    id = sql.Column(sql.Integer, primary_key=True)
    username = sql.Column(sql.String, unique=True)
    # email = sql.Column(sql.String, unique=True)
    password = sql.Column(sql.String)
    is_admin = sql.Column(sql.Boolean, default=False)

    def __repr__(self):
        return f"<User (id={self.id}, username={self.username})>"
