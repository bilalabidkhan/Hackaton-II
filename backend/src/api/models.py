from pydantic import BaseModel
from typing import List, Optional
from ..models.todo import TodoRead

class TodoListResponse(BaseModel):
    todos: List[TodoRead]

class ErrorResponse(BaseModel):
    error: str

class SuccessResponse(BaseModel):
    message: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserResponse(BaseModel):
    id: str
    email: str

class TodoCompleteRequest(BaseModel):
    is_completed: bool