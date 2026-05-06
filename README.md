==========================================================
   TEAM TASK MANAGEMENT SYSTEM - PROJECT OVERVIEW
==========================================================

1. PROJECT DESCRIPTION:
-----------------------
A full-stack MERN (MongoDB, Express, React, Node) application 
designed for internal organization task tracking. It allows 
Administrators to assign tasks and Employees to track and 
complete them.

2. KEY FEATURES:
----------------
* ADMIN DASHBOARD: 
  - Real-time Stats Grid (Total, Done, Overdue)
  - Task Assignment form with Manual Email Input
  - Team Directory displaying all registered employees
  
* EMPLOYEE DASHBOARD:
  - Personalized task list filtered by user email
  - Status update functionality (Mark as Done)
  
* AUTHENTICATION:
  - Secure Login/Signup system
  - JWT (JSON Web Token) with Role-based access control (Admin/Employee)

3. TECH STACK:
--------------
- Frontend: React.js (Vite), Axios
- Backend: Node.js, Express.js
- Database: MongoDB
- Security: BcryptJS for password hashing, JWT for session management

4. SETUP INSTRUCTIONS:
----------------------
A. Backend:
   1. Open terminal in the server folder.
   2. Run 'npm install'.
   3. Set up .env file (PORT, MONGO_URI, JWT_SECRET).
   4. Run 'npm start'.

B. Frontend:
   1. Open terminal in the client folder.
   2. Run 'npm install'.
   3. Run 'npm run dev'.

5. API ENDPOINTS:
-----------------
- POST /api/auth/signup  : Register new user
- POST /api/auth/login   : Authenticate user & get token
- GET  /api/tasks        : Fetch tasks based on role
- POST /api/tasks        : Create new task (Admin Only)
- PATCH /api/tasks/:id   : Update task status

