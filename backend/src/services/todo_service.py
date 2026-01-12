from sqlmodel import Session, select
from typing import List, Optional
import uuid
from ..models.todo import Todo, TodoCreate, TodoUpdate
from ..models.user import User

class TodoService:
    @staticmethod
    def get_todos_by_user(db: Session, user_id: str) -> List[Todo]:
        """Get all todos for a specific user"""
        try:
            user_uuid = uuid.UUID(user_id)
        except ValueError:
            return []

        statement = select(Todo).where(Todo.user_id == user_uuid)
        return db.exec(statement).all()

    @staticmethod
    def create_todo(db: Session, todo_create: TodoCreate, user_id: str) -> Todo:
        """Create a new todo for a user"""
        try:
            user_uuid = uuid.UUID(user_id)
        except ValueError:
            raise ValueError("Invalid user ID format")

        db_todo = Todo(
            **todo_create.dict(),
            user_id=user_uuid
        )
        db.add(db_todo)
        db.commit()
        db.refresh(db_todo)
        return db_todo

    @staticmethod
    def get_todo_by_id(db: Session, todo_id: str, user_id: str) -> Optional[Todo]:
        """Get a specific todo by ID for a user"""
        try:
            todo_uuid = uuid.UUID(todo_id)
            user_uuid = uuid.UUID(user_id)
        except ValueError:
            return None

        statement = select(Todo).where(Todo.id == todo_uuid, Todo.user_id == user_uuid)
        return db.exec(statement).first()

    @staticmethod
    def update_todo(db: Session, todo_id: str, todo_update: TodoUpdate, user_id: str) -> Optional[Todo]:
        """Update a specific todo for a user"""
        try:
            todo_uuid = uuid.UUID(todo_id)
            user_uuid = uuid.UUID(user_id)
        except ValueError:
            return None

        db_todo = TodoService.get_todo_by_id(db, str(todo_uuid), str(user_uuid))
        if db_todo:
            update_data = todo_update.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(db_todo, field, value)
            db.add(db_todo)
            db.commit()
            db.refresh(db_todo)
        return db_todo

    @staticmethod
    def delete_todo(db: Session, todo_id: str, user_id: str) -> bool:
        """Delete a specific todo for a user"""
        try:
            todo_uuid = uuid.UUID(todo_id)
            user_uuid = uuid.UUID(user_id)
        except ValueError:
            return False

        db_todo = TodoService.get_todo_by_id(db, str(todo_uuid), str(user_uuid))
        if db_todo:
            db.delete(db_todo)
            db.commit()
            return True
        return False

    @staticmethod
    def toggle_todo_completion(db: Session, todo_id: str, user_id: str, is_completed: bool) -> Optional[Todo]:
        """Toggle completion status of a specific todo for a user"""
        try:
            todo_uuid = uuid.UUID(todo_id)
            user_uuid = uuid.UUID(user_id)
        except ValueError:
            return None

        db_todo = TodoService.get_todo_by_id(db, str(todo_uuid), str(user_uuid))
        if db_todo:
            db_todo.is_completed = is_completed
            db.add(db_todo)
            db.commit()
            db.refresh(db_todo)
        return db_todo