---
description: "Task list for Phase I In-Memory Python Console Todo App"
---

# Tasks: Phase I In-Memory Python Console Todo App

**Input**: Design documents from `/specs/001-in-memory-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Project root**: `src/`, `tests/` at repository root
- **Application package**: `src/todo_app/`
- **Layers**: `src/todo_app/models/`, `src/todo_app/services/`, `src/todo_app/cli/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per implementation plan in src/
- [x] T002 [P] Create package structure: src/todo_app/, src/todo_app/models/, src/todo_app/services/, src/todo_app/cli/
- [x] T003 [P] Create __init__.py files in all directories

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create TodoItem model in src/todo_app/models/todo.py
- [x] T005 Create TodoCollection model in src/todo_app/models/todo.py
- [x] T006 Create TodoService in src/todo_app/services/todo_service.py
- [x] T007 Create CLI interface in src/todo_app/cli/main.py
- [x] T008 Create main application entry point in todo_main.py

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add Todo Items (Priority: P1) 🎯 MVP

**Goal**: Users can add new todo items with a description and unique identifier

**Independent Test**: Can be fully tested by running the application, adding a new todo item, and verifying that the item appears in the list when viewed.

### Implementation for User Story 1

- [x] T009 [US1] Implement TodoItem class with id, description, and completed attributes in src/todo_app/models/todo.py
- [x] T010 [US1] Implement TodoCollection.add_item method in src/todo_app/models/todo.py
- [x] T011 [US1] Implement TodoService.add_todo method in src/todo_app/services/todo_service.py
- [x] T012 [US1] Implement CLI function to add todos in src/todo_app/cli/main.py
- [x] T013 [US1] Add CLI menu option for adding todos in src/todo_app/cli/main.py
- [x] T014 [US1] Add input validation for empty descriptions in src/todo_app/services/todo_service.py

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Todo Items (Priority: P1)

**Goal**: Users can view all todo items with their status and identifiers in a clear, readable format

**Independent Test**: Can be fully tested by adding several todo items and then viewing the list to confirm all items are displayed correctly.

### Implementation for User Story 2

- [x] T015 [US2] Implement TodoCollection.get_all_items method in src/todo_app/models/todo.py
- [x] T016 [US2] Implement TodoService.get_all_todos method in src/todo_app/services/todo_service.py
- [x] T017 [US2] Implement CLI function to view todos in src/todo_app/cli/main.py
- [x] T018 [US2] Add CLI menu option for viewing todos in src/todo_app/cli/main.py
- [x] T019 [US2] Format output to show ID, description, and completion status clearly in src/todo_app/cli/main.py

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Mark Todo Items Complete (Priority: P2)

**Goal**: Users can mark todo items as complete so that they can track progress and distinguish between completed and pending tasks

**Independent Test**: Can be fully tested by adding a todo item, marking it as complete, and then viewing the list to confirm the status has changed.

### Implementation for User Story 3

- [x] T020 [US3] Implement TodoCollection.mark_complete method in src/todo_app/models/todo.py
- [x] T021 [US3] Implement TodoService.mark_todo_complete method in src/todo_app/services/todo_service.py
- [x] T022 [US3] Implement CLI function to mark todos complete in src/todo_app/cli/main.py
- [x] T023 [US3] Add CLI menu option for marking todos complete in src/todo_app/cli/main.py
- [x] T024 [US3] Implement toggle functionality for complete/incomplete in src/todo_app/services/todo_service.py

**Checkpoint**: At this point, User Stories 1, 2 AND 3 should all work independently

---

## Phase 6: User Story 4 - Update Todo Items (Priority: P2)

**Goal**: Users can update the description of existing todo items so that they can correct mistakes or modify the task details

**Independent Test**: Can be fully tested by adding a todo item, updating its description, and then viewing the list to confirm the changes were applied.

### Implementation for User Story 4

- [x] T025 [US4] Implement TodoCollection.update_item method in src/todo_app/models/todo.py
- [x] T026 [US4] Implement TodoService.update_todo method in src/todo_app/services/todo_service.py
- [x] T027 [US4] Implement CLI function to update todos in src/todo_app/cli/main.py
- [x] T028 [US4] Add CLI menu option for updating todos in src/todo_app/cli/main.py
- [x] T029 [US4] Add validation for empty descriptions in update operation in src/todo_app/services/todo_service.py

**Checkpoint**: At this point, User Stories 1, 2, 3 AND 4 should all work independently

---

## Phase 7: User Story 5 - Delete Todo Items (Priority: P2)

**Goal**: Users can delete todo items that they no longer need so that they can keep their todo list clean and focused on relevant tasks

**Independent Test**: Can be fully tested by adding todo items, deleting one, and then viewing the list to confirm the deleted item is no longer present.

### Implementation for User Story 5

- [x] T030 [US5] Implement TodoCollection.delete_item method in src/todo_app/models/todo.py
- [x] T031 [US5] Implement TodoService.delete_todo method in src/todo_app/services/todo_service.py
- [x] T032 [US5] Implement CLI function to delete todos in src/todo_app/cli/main.py
- [x] T033 [US5] Add CLI menu option for deleting todos in src/todo_app/cli/main.py
- [x] T034 [US5] Handle edge case when trying to delete non-existent todo in src/todo_app/services/todo_service.py

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T035 [P] Create comprehensive CLI menu with all options in src/todo_app/cli/main.py
- [x] T036 [P] Add error handling for invalid user inputs in src/todo_app/cli/main.py
- [x] T037 [P] Add validation for all service methods in src/todo_app/services/todo_service.py
- [x] T038 [P] Add input validation to prevent operations on non-existent todo IDs
- [x] T039 [P] Create main application loop in todo_main.py
- [x] T040 [P] Add proper error messages for all failure cases
- [x] T041 [P] Add documentation strings to all classes and methods
- [x] T042 [P] Run manual test scenarios from quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in priority order (US1, US2, US3/4/5)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Models before services
- Services before CLI interface
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Add Todo Items)
4. Complete Phase 4: User Story 2 (View Todo Items)
5. **STOP and VALIDATE**: Test User Stories 1 & 2 together - this is the MVP!
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Stories 1 & 2 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 3 → Test independently → Deploy/Demo
4. Add User Story 4 → Test independently → Deploy/Demo
5. Add User Story 5 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
   - Developer E: User Story 5
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence