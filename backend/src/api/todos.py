from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import List
from ..database import get_session
from ..models.todo import Todo, TodoCreate, TodoUpdate, TodoRead
from ..models.user import User
from ..services.todo_service import TodoService
from ..api.models import TodoListResponse, SuccessResponse, TodoCompleteRequest
from .auth import get_current_user

router = APIRouter()

@router.get("/todos", response_model=TodoListResponse)
def get_todos(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    """Get all todos for the authenticated user"""
    todos = TodoService.get_todos_by_user(db, str(current_user.id))
    return TodoListResponse(todos=todos)

@router.post("/todos", response_model=TodoRead)
def create_todo(
    todo: TodoCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    """Create a new todo for the authenticated user"""
    db_todo = TodoService.create_todo(db, todo, str(current_user.id))
    return db_todo

@router.put("/todos/{todo_id}", response_model=TodoRead)
def update_todo(
    todo_id: str,
    todo_update: TodoUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    """Update an existing todo for the authenticated user"""
    db_todo = TodoService.get_todo_by_id(db, todo_id, str(current_user.id))
    if not db_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )

    updated_todo = TodoService.update_todo(db, todo_id, todo_update, str(current_user.id))
    if not updated_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )

    return updated_todo

@router.delete("/todos/{todo_id}", response_model=SuccessResponse)
def delete_todo(
    todo_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    """Delete a todo for the authenticated user"""
    success = TodoService.delete_todo(db, todo_id, str(current_user.id))
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )

    return SuccessResponse(message="Todo deleted successfully")

@router.patch("/todos/{todo_id}/complete", response_model=TodoRead)
def toggle_todo_complete(
    todo_id: str,
    todo_complete_request: TodoCompleteRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    """Toggle completion status of a todo for the authenticated user"""
    is_completed = todo_complete_request.is_completed
    updated_todo = TodoService.toggle_todo_completion(db, todo_id, str(current_user.id), is_completed)
    if not updated_todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )

    return updated_todo