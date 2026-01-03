"""
Main entry point for the todo application when run as a module.
"""

from .cli.main import TodoCLI


def main():
    """Main function to run the todo application."""
    cli = TodoCLI()
    cli.run()


if __name__ == "__main__":
    main()