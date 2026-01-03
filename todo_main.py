#!/usr/bin/env python3
"""
Main entry point for the Phase I In-Memory Python Console Todo App.
"""

from src.todo_app.cli.main import TodoCLI


def main():
    """Main function to run the todo application."""
    cli = TodoCLI()
    cli.run()


if __name__ == "__main__":
    main()