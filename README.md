# 🌱 SeedShare Garden – Garden Plot Management System

**BDF Group Assignment – Backend Development Fundamentals**

A backend application developed using Node.js, Express.js and SQLite to manage gardeners, garden plots, leases and plot availability.

## 👥 Group Details – LG-2

| S.No. | Student Name | Roll Number | Responsibility |
|---|---|---|---|
| 1 | Rishi | 252U1R8059 | Gardeners Management |
| 2 | Suhail | 252U1R8061 | Garden Plots Management |
| 3 | Lasya | 252U1R8062 | Lease Management and JOIN |
| 4 | Rakshitha | 252U1R8069 | Availability and Integration |

## 📌 Project Description

SeedShare Garden is a Garden Plot Management System that provides REST APIs to manage gardeners, garden plots and leases. It supports CRUD operations, input validation, SQL JOIN operations, soil-type search and date-based plot availability checking.

## 🛠️ Technologies Used

- Backend: Node.js and Express.js
- Database: SQLite
- API Testing: Postman
- Version Control: Git and GitHub

---

# 👨‍💻 Individual Contributions

## 1. Member 1 – Gardeners Management

**Name:** Rishi  
**Roll Number:** 252U1R8059  
**Branch:** `member1-gardeners`

**Responsibilities:**
- Implement CRUD operations for gardeners.
- Create routes to add, retrieve, update and delete gardeners.
- Validate gardener name and email.
- Handle invalid gardener IDs.
- Return appropriate HTTP status codes.

**API Endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/gardeners` | Get all gardeners |
| GET | `/gardeners/:id` | Get gardener by ID |
| POST | `/gardeners` | Add gardener |
| PUT | `/gardeners/:id` | Update gardener |
| DELETE | `/gardeners/:id` | Delete gardener |

**Deliverables:** Controller, routes, CRUD implementation, Postman tests and screenshots.

---

## 2. Member 2 – Garden Plots Management

**Name:** Suhail  
**Roll Number:** 252U1R8061  
**Branch:** `member2-plots`

**Responsibilities:**
- Implement CRUD operations for garden plots.
- Add plot name, soil type and plot details.
- Implement search using a soil-type query parameter.
- Validate plot information.
- Handle nonexistent plot IDs.

**API Endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/plots` | Get all plots |
| GET | `/plots/:id` | Get plot by ID |
| POST | `/plots` | Create plot |
| PUT | `/plots/:id` | Update plot |
| DELETE | `/plots/:id` | Delete plot |
| GET | `/plots?soil_type=loamy` | Search by soil type |

**Deliverables:** Plot management code, search functionality, Postman tests and screenshots.

---

## 3. Member 3 – Lease Management and JOIN

**Name:** Lasya  
**Roll Number:** 252U1R8062  
**Branch:** `member3-leases`

**Responsibilities:**
- Implement CRUD operations for leases.
- Connect gardeners with their assigned plots.
- Create the JOIN endpoint.
- Display gardener names and plot names together.
- Validate gardener IDs and plot IDs.
- Handle missing records.

**API Endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/leases` | Get all leases |
| GET | `/leases/:id` | Get lease by ID |
| POST | `/leases` | Create lease |
| PUT | `/leases/:id` | Update lease |
| DELETE | `/leases/:id` | Delete lease |
| GET | `/gardeners-with-plots` | Get gardeners with plots |

**Deliverables:** Lease management code, SQL JOIN query, Postman tests and screenshots.

---

## 4. Member 4 – Availability and Integration

**Name:** Rakshitha  
**Roll Number:** 252U1R8069  
**Branch:** `member4-availability`

**Responsibilities:**
- Implement the free-on-this-date functionality.
- Create the availability endpoint.
- Check lease start dates and end dates.
- Exclude plots with active leases on the requested date.
- Reject invalid lease dates with HTTP 400.
- Validate date formats and actual calendar dates.
- Integrate the modules into the main Express application.
- Test the application and prepare the Postman collection.

**API Endpoint:**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/plots/available?date=YYYY-MM-DD` | Get plots available on a requested date |

**Deliverables:** Availability logic, integration code, Postman tests and screenshots.

---

# 🌿 GitHub Collaboration

**Repository:**  
https://github.com/rakshithapandillap-hash/SeedShare-Garden

### Individual Branches

| Member | Branch Name |
|---|---|
| Rishi | `member1-gardeners` |
| Suhail | `member2-plots` |
| Lasya | `member3-leases` |
| Rakshitha | `member4-availability` |

### Collaboration Workflow

1. Each member develops their assigned module.
2. Members test their APIs using Postman.
3. Each member pushes code to the common GitHub repository.
4. Pull requests are created for reviewing contributions.
5. Approved contributions are merged into the `main` branch.

---

# ⚙️ Installation and Execution

**Prerequisites:** Node.js, npm, Git and Postman.

**1. Clone the repository:**
```bash
git clone https://github.com/rakshithapandillap-hash/SeedShare-Garden.git
```

**2. Navigate to the project:**
```bash
cd SeedShare-Garden
```

**3. Install dependencies:**
```bash
npm install
```

**4. Start the server:**
```bash
node src/app.js
```

**5. Access the API:**
```text
http://localhost:3000
```

Use Postman to test the API endpoints.

---

# 🧪 API Testing

The application is tested using Postman for:
- CRUD operations.
- Retrieving records by ID.
- Input validation and error handling.
- Invalid lease dates.
- SQL JOIN operations.
- Soil-type search.
- Date-based plot availability.
- Appropriate HTTP status codes.

# 🎯 Project Outcome

SeedShare Garden provides a backend solution for managing gardeners, garden plots, leases and plot availability. The project demonstrates REST API development, database operations, SQL queries, input validation, API testing and GitHub collaboration.

**Course:** Backend Development Fundamentals (BDF)  
**Group:** LG-2  
**Project:** SeedShare Garden – Garden Plot Management System

**Developed as a group assignment by all four members.**
