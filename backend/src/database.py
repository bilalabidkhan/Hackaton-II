from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy import event
from sqlalchemy.pool import Pool
from typing import Generator
import os
from .models import User, Todo

# Get database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todo_app.db")

# Create engine
engine = create_engine(DATABASE_URL, echo=False)

def create_db_and_tables():
    """Create database tables if they don't exist"""
    SQLModel.metadata.create_all(bind=engine)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

# Connection pooling configuration
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    if "sqlite" in engine.url.drivername:
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()