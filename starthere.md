Backend API surface (extracted)
I found and mapped these endpoints:

Auth

POST /api/auth/login
Request: { username, password }
Response: { token, username, role, email }
POST /api/auth/register
Request: { username, email, password, role? }
Response: { id, username, email, role }
POST /api/auth/validate
Request: { token }
Response: { id, username, email, role }
Members (/api/members)

GET /api/members -> list of Member
GET /api/members/{id} -> Member
GET /api/members/email/{email} -> Member (404 when not found)
POST /api/members -> create Member (sends Member entity shape)
PUT /api/members/{id} -> update Member
DELETE /api/members/{id} -> deactivate Member
Roles allowed (SecurityConfig): ADMIN, PASTOR, MEMBER
Donations

No explicit DonationController found in controllers directory.
DonationService and DonationRepository exist with methods:
CRUD style operations: create, update, getAll, getById, getByMember, getByDateRange, delete
SecurityConfig restricts /api/donations/** to roles ADMIN and PASTOR.
Action: frontend expects server to expose typical REST endpoints under /api/donations. If missing, coordinate with backend owner to add them.
Key backend data shapes (mapped to TypeScript interfaces)
Below are TypeScript-friendly contracts to drop into src/types/*.ts.

User / Auth

LoginRequest: { username: string; password: string }
LoginResponse: { token: string; username: string; role: string; email: string }
RegisterRequest: { username: string; email: string; password: string; role?: string }
UserInfo: { id: string; username: string; email: string; role: string }
Member (based on Member entity / MemberDTO)

interface Member { id?: string; firstName: string; lastName: string; email: string; phoneNumber?: string | null; dateOfBirth?: string | null; // ISO date address?: string | null; membershipDate?: string | null; // ISO date baptismDate?: string | null; isActive?: boolean; familyId?: number | null; userId?: string | null; createdAt?: string; updatedAt?: string | null; }
Donation (based on entity)

interface Donation { id?: string; amount: string; // BigDecimal -> string donationType: "TITHE" | "SPECIAL" | "OTHER"; memberId?: string | null; isAnonymous?: boolean; notes?: string | null; donationDate?: string; // ISO createdAt?: string; }
Design & architecture (frontend)

Tooling

Bootstrapping: Vite + React + TypeScript (recommended): npm create vite@latest frontend -- --template react-ts
Package manager: npm or pnpm — either is fine. Use lockfile.
File conventions

src/
main (entry): src/main.tsx
App root: src/App.tsx
pages: src/pages/* (Auth, MembersList, MemberDetail/Edit, DonationsList, DonationDetail/Edit, Dashboard)
components: src/components/* (forms, tables, nav, guarded routes)
hooks: src/hooks/* (useAuth, useApi)
services: src/services/apiClient.ts (typed fetch wrapper), src/services/auth.ts
types: src/types/*.ts
styles: src/styles/*.scss or pure CSS if preferred; import Bulma in main.tsx
All files must be .ts or .tsx. Use .json for configs and .yml when needed.
Auth flow

Login page posts to /api/auth/login, stores token in localStorage: key jpi_token.
AuthProvider React Context exposes token, user info, login, logout.
PrivateRoute / role guard implemented using React Router v6: redirect to /login if no token, and show/disable UI based on role.
API client

Single small typed wrapper around fetch:
Accepts path, method, typed body, auto-attaches Authorization: Bearer <token> if present.
Returns typed JSON and handles 401 (redirect to login) and error responses.
Styling

Bulma only. Import as import 'bulma/css/bulma.min.css' in main.tsx.
Avoid adding other CSS frameworks. Use small component-level CSS modules only if necessary (e.g., .module.scss) — those will be TypeScript-aware (type declarations) and not .js.
Routing

Use React Router v6 (TypeScript).
Routes:
/login, /register, /validate (optional)
/dashboard
/members, /members/:id, /members/new
/donations, /donations/:id, /donations/new
Tests

Vitest + React Testing Library for unit tests.
Place tests as .test.tsx next to components.
Tooling & linting (no .js configs)

tsconfig.json (required)
.eslintrc.json instead of .eslintrc.js (ESLint + TypeScript parser)
prettier.config.json or .prettierrc (JSON)
vite.config.ts (TypeScript)
Husky hooks: note Husky uses JS in some flows; to avoid JS config files, prefer simple npm test workflows or GitHub Actions CI checks.
Security & CORS

Backend @CrossOrigin(origins = ["*"]) is already applied on controllers; confirm env-specific CORS for production.
Keep token storage in localStorage initially; consider HTTP-only cookies if more secure storage is required later.
Accessibility & UX

Use Bulma form controls and notification classes.
Provide inline validation and server error handling for forms (display messages from backend ErrorResponse shape).
For role-based UI, hide actions like delete/create where backend restricts roles.
Concrete tasks (PR-sized) — create frontend repo frontend/ at repository root

Task 0 — repo bootstrapping (PR #1)

Create frontend/ using Vite React + TS.
Files to create:
frontend/package.json, frontend/tsconfig.json, frontend/vite.config.ts
frontend/index.html
frontend/src/main.tsx — imports Bulma CSS and renders App.
frontend/.eslintrc.json, frontend/prettier.config.json
Deliverable: app starts on npm run dev and shows a placeholder home page.
Task 1 — basic app shell & auth (PR #2)

Create src/App.tsx, src/routes.tsx.
Create src/pages/Login.tsx, src/pages/Register.tsx.
Create src/contexts/AuthContext.tsx (use localStorage).
Implement typed src/services/apiClient.ts.
Add src/types/auth.ts.
Add navigation src/components/Navbar.tsx showing username when logged in.
Deliverable: can login (call /api/auth/login) and token stored/retrieved; protected route redirect works.
Task 2 — Members pages (PR #3)

Create src/pages/MembersList.tsx (table with Bulma classes).
Create src/pages/MemberDetail.tsx (view & edit).
Create src/components/MemberForm.tsx (create/edit).
Create src/types/member.ts.
Implement API calls: GET /api/members, POST /api/members, PUT /api/members/{id}, GET /api/members/{id}, DELETE /api/members/{id}.
Deliverable: list members, open member, create new, update, deactivate.
Task 3 — Donations pages (PR #4)

Confirm backend exposes /api/donations endpoints. If not, open a small issue for backend.
Create src/types/donation.ts.
Create src/pages/DonationsList.tsx, src/pages/DonationDetail.tsx, src/components/DonationForm.tsx.
Implement API functions for donations.
Deliverable: list and manage donations (ADMIN & PASTOR roles).
Task 4 — Role-based UI & tests (PR #5)

Implement role guard HOC/hooks that hide UI actions for non-authorized roles.
Add unit tests for AuthContext, MemberForm, and apiClient.
Deliverable: tests for auth flows and one component.
Task 5 — CI and linting (PR #6)

Add GitHub Actions workflow .github/workflows/frontend-ci.yml to run:
Install deps
Typecheck (tsc --noEmit)
ESLint (eslint . --ext .ts,.tsx)
Unit tests (vitest)
No .js files in repo root or frontend/src.
Extras / small proactive improvements

Add README.md inside frontend/ with run instructions.
Add src/config.ts for base API URL (read from env VITE_API_URL).
API type examples (one-line descriptions)

src/types/auth.ts -> LoginRequest, LoginResponse, RegisterRequest, UserInfo
src/types/member.ts -> Member interface matching backend Member/MemberDTO
src/types/donation.ts -> Donation interface mapping to entity
Questions / blockers for backend team

Is there a REST DonationController exposing /api/donations? If not, request adding standard endpoints (GET list, GET by id, POST, PUT, DELETE) and ensure they return JSON matching Donation entity fields (member id as UUID string).
Confirm CORS and the production API base URL.
Requirements coverage mapping

React + TypeScript only (no .js source files): Plan uses Vite TS template and enforces .ts/.tsx files. (Done in design; implementation task created)
Bulma-only styles: import bulma/css/bulma.min.css and use Bulma classes. (Done in design; implementation task created)
JWT auth & role-based UI: covered by AuthContext and route guards. (Done in design)
API mapping to backend controllers: mapped above; donation controller may be missing — noted and flagged. (Mapped; backend followup required)