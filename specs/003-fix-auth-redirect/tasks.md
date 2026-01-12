# Tasks: Fix Todos Page Auth Redirect

## Feature Overview
Fix the authentication redirect issue in the Full-Stack Todo App where users are redirected to the login page when accessing the /todos route even after successful signup/signin. The root cause is a mismatch between middleware checking for tokens in cookies while the frontend stores tokens only in localStorage.

## Dependencies
- User Story 1 (Token Storage Fix) must be completed before User Story 2 (Route Protection) and User Story 3 (Redirect Logic)
- All foundational tasks must be completed before user story tasks

## Parallel Execution Examples
- T002-T004 can be executed in parallel during setup phase
- T008-T010 can be executed in parallel during foundational phase
- [US2] and [US3] tasks can be developed in parallel after [US1] completion

## Implementation Strategy
MVP scope includes only User Story 1 (Token Storage Fix) which resolves the core issue. Subsequent stories enhance the authentication flow.

---

## Phase 1: Setup

- [X] T001 Create js-cookie dependency installation task in frontend
- [X] T002 Set up authentication utility functions for token synchronization
- [X] T003 Document the token storage approach in README

## Phase 2: Foundational

- [X] T004 [P] Install js-cookie library in frontend directory
- [X] T005 [P] Create token utility functions for dual storage (cookie/localStorage)
- [X] T006 [P] Update TypeScript types for token management
- [X] T007 [P] Create helper functions for reading tokens from both storage types
- [X] T008 [P] Create helper functions for writing tokens to both storage types
- [X] T009 [P] Create helper functions for removing tokens from both storage types
- [X] T010 [P] Test token utility functions implementation

## Phase 3: [US1] Token Storage Synchronization

**Goal**: Ensure authentication tokens are stored in both cookies and localStorage for proper server-client synchronization.

**Independent Test Criteria**: After this phase, users should be able to authenticate successfully and access protected routes without being redirected to login.

### Implementation Tasks

- [X] T011 [US1] Update auth-context.tsx to store tokens in cookies after signin
- [X] T012 [US1] Update auth-context.tsx to store tokens in cookies after signup
- [X] T013 [US1] Update auth-context.tsx to store tokens in localStorage alongside cookies
- [X] T014 [US1] Update auth-context.tsx to check for tokens in both cookies and localStorage on initial load
- [X] T015 [US1] Update auth-context.tsx to remove tokens from both storage locations on signout
- [X] T016 [US1] Synchronize token values between cookie and localStorage when only one exists
- [X] T017 [US1] Test token storage synchronization after authentication
- [X] T018 [US1] Verify middleware can access tokens from cookies after this fix

### Tests

- [X] T019 [US1] Verify token is stored in both cookies and localStorage after signin
- [X] T020 [US1] Verify token is stored in both cookies and localStorage after signup
- [X] T021 [US1] Verify authentication state is maintained after page refresh
- [X] T022 [US1] Verify user can access /todos after successful authentication

## Phase 4: [US2] Token Validation Enhancement

**Goal**: Improve token validation to work with the new dual-storage approach and ensure protected routes function correctly.

**Independent Test Criteria**: After this phase, protected routes should correctly validate tokens from both storage mechanisms.

### Implementation Tasks

- [X] T023 [US2] Update auth-context.tsx to validate tokens from both storage locations
- [X] T024 [US2] Ensure isAuthenticated property reflects dual-storage validation
- [X] T025 [US2] Update API client to read tokens from both cookies and localStorage
- [X] T026 [US2] Test token validation with both storage methods
- [X] T027 [US2] Verify protected routes properly validate tokens from cookies

### Tests

- [X] T028 [US2] Verify token validation works when stored in cookies only
- [X] T029 [US2] Verify token validation works when stored in localStorage only
- [X] T030 [US2] Verify token validation works when stored in both locations
- [X] T031 [US2] Test API calls include valid tokens from either storage location

## Phase 5: [US3] Redirect Logic Correction

**Goal**: Fix redirect logic to properly handle authentication state and ensure users are redirected appropriately.

**Independent Test Criteria**: After this phase, users should be redirected to login when unauthenticated and to original route after successful login.

### Implementation Tasks

- [X] T032 [US3] Verify redirect after login goes to intended destination
- [X] T033 [US3] Test redirect logic works with fixed token storage
- [X] T034 [US3] Ensure unauthenticated users are still redirected to login
- [X] T035 [US3] Update login page to redirect to intended route after authentication
- [X] T036 [US3] Test redirect preservation after successful authentication

### Tests

- [X] T037 [US3] Verify users are redirected to login when accessing /todos without authentication
- [X] T038 [US3] Verify users return to intended route after successful login
- [X] T039 [US3] Test redirect behavior with various protected routes
- [X] T040 [US3] Verify redirect logic works with synchronized token storage

## Phase 6: [US4] API Integration Verification

**Goal**: Ensure all authentication API calls work correctly with the new token storage approach.

**Independent Test Criteria**: After this phase, all authentication API endpoints should function properly with the updated token handling.

### Implementation Tasks

- [X] T041 [US4] Verify signin API integration works with new token storage
- [X] T042 [US4] Verify signup API integration works with new token storage
- [X] T043 [US4] Verify signout API integration works with dual token removal
- [X] T044 [US4] Test error handling for failed authentication attempts
- [X] T045 [US4] Ensure API responses are properly processed with new storage approach

### Tests

- [X] T046 [US4] Test successful signin with token storage verification
- [X] T047 [US4] Test successful signup with token storage verification
- [X] T048 [US4] Test failed authentication with proper error handling
- [X] T049 [US4] Verify signout removes tokens from both storage locations

## Phase 7: Polish & Cross-Cutting Concerns

- [X] T050 Update documentation to reflect dual token storage approach
- [X] T051 Add error handling for token synchronization failures
- [X] T052 Create utility functions for token expiry validation
- [X] T053 Add logging for authentication events and token synchronization
- [X] T054 Perform security review of dual token storage implementation
- [X] T055 Test edge cases like expired tokens and storage quota limits
- [X] T056 Clean up legacy token handling code where appropriate
- [X] T057 Final integration test of complete authentication flow
- [X] T058 Verify all success criteria from specification are met