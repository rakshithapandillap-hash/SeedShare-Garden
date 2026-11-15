# 🌱 SeedShare Garden – Garden Plot Management System

**BDF Group Assignment – Backend Development Fundamentals**

A backend application developed using Node.js, Express.js and SQLite to manage gardeners, garden plots, leases and plot availability.

---

## 👥 Group Details

**Group: LG-2**

| S. No. | Student Name | Roll Number | Individual Responsibility |
|---|---|---|---|
| 1 | Rishi | 252U1R8059 | Gardeners Management |
| 2 | Suhail | 252U1R8061 | Garden Plots Management |
| 3 | Lasya | 252U1R8062 | Lease Management and JOIN |
| 4 | Rakshitha | 252U1R8069 | Availability and Integration |

---

## 📌 Project Description

SeedShare Garden is a Garden Plot Management System designed to manage gardeners, garden plots and leases.

The system provides REST APIs to perform CRUD operations, manage relationships between gardeners and plots, validate lease dates and check plot availability on a requested date.

### Key Features

- Manage gardener information.
- Create, retrieve, update and delete garden plots.
- Manage leases between gardeners and plots.
- Retrieve related gardener and plot information using SQL JOIN operations.
- Validate input data and lease dates.
- Search garden plots using soil-type query parameters.
- Check available plots for a particular date.
- Handle invalid requests with appropriate HTTP status codes.

---

## 🛠️ Technologies Used

- **Backend:** Node.js
- **Framework:** Express.js
- **Database:** SQLite
- **API Testing:** Postman
- **Version Control:** Git and GitHub

---

# 👨‍💻 Individual Contributions

## Member 1 – Gardeners Management

**Student Name:** Rishi  
**Roll Number:** 252U1R8059  
**Branch:** `member1-gardeners`

### Responsibilities

- Implement CRUD operations for gardeners.
- Create routes to add, retrieve, update and delete gardeners.
- Validate gardener details such as name and email.
- Handle invalid gardener IDs.
- Return appropriate HTTP status codes.

### API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/gardeners` | Retrieve all gardeners |
| GET | `/gardeners/:id` | Retrieve a gardener by ID |
| POST | `/gardeners` | Add a new gardener |
| PUT | `/gardeners/:id` | Update gardener details |
| DELETE | `/gardeners/:id` | Delete a gardener |

### Deliverables

- Gardener controller and routes.
- CRUD implementation.
- Postman API testing.
- Output screenshots.

---

## Member 2 – Garden Plots Management

**Student Name:** Suhail  
**Roll Number:** 252U1R8061  
**Branch:** `member2-plots`

### Responsibilities

- Implement CRUD operations for garden plots.
- Add plot name, soil type and plot details.
- Implement search using a soil-type query parameter.
- Validate plot information.
- Handle nonexistent plot IDs.

### API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/plots` | Retrieve all garden plots |
| GET | `/plots/:id` | Retrieve a plot by ID |
| POST | `/plots` | Create a new plot |
| PUT | `/plots/:id` | Update plot details |
| DELETE | `/plots/:id` | Delete a plot |
| GET | `/plots?soil_type=loamy` | Search plots by soil type |

### Deliverables

- Plot management controller and routes.
- Soil-type search functionality.
- Input validation.
- Postman API testing.
- Output screenshots.

---

## Member 3 – Lease Management and JOIN

**Student Name:** Lasya  
**Roll Number:** 252U1R8062  
**Branch:** `member3-leases`

### Responsibilities

- Implement CRUD operations for leases.
- Connect gardeners with their assigned plots.
- Create the JOIN endpoint.
- Display gardener names and plot names together.
- Validate gardener IDs and plot IDs.
- Handle missing records.

### API Endpoints

| HTTP Method | Endpoint | Description |
|---|---
