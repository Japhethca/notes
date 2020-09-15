from data_store.models.base import Base
import sqlalchemy as sql
from sqlalchemy.sql import func


class Notes(Base):
    __tablename__ = "notes"
    id = sql.Column(sql.Integer, primary_key=True)
    title = sql.Column(sql.String)
    description = sql.Column(sql.Text)
    user_id = sql.Column(sql.Integer, sql.ForeignKey("users.id"), nullable=True)
    created_at = sql.Column(sql.DateTime(timezone=True), server_default=func.now())
    updated_at = sql.Column(sql.DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Note (id={self.id}, title={self.title})>"
