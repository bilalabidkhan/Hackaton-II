from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import create_db_and_tables
from .api.todos import router as todos_router
from .api.auth import router as auth_router

# Create FastAPI app
app = FastAPI(
    title="Full-Stack Todo Web Application API",
    description="REST API for the multi-user todo application",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(todos_router, prefix="/api", tags=["Todos"])
app.include_router(auth_router, prefix="/api", tags=["Authentication"])

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"message": "Full-Stack Todo Web Application API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}