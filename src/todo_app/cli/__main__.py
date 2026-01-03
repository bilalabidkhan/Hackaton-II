"""
Main entry point for the todo CLI when run as a module.
"""

from .main import TodoCLI


def main():
    """Main function to run the todo application."""
    cli = TodoCLI()
    cli.run()


if __name__ == "__main__":
    main()