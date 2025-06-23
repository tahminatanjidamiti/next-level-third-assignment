# 📚 Library Management

This is a backend project for managing books and borrowing operations in a library. It is built using **Node.js**, **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**.

---

## 🚀 Features

- ✅ CRUD operations for Books
- ✅ Borrow system with availability check
- ✅ Aggregated summary of borrowed books
- ✅ Schema validation and centralized error handling
- ✅ Type safety with TypeScript
- ✅ Well-structured modular architecture

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **Postman** – for API testing

## 📁 Project Structure

```txt
src/
├── app/
│   ├── controllers/
│   │   ├── books.controller.ts       # Book-related routes and logic
│   │   └── borrow.controller.ts      # Borrow-related routes and logic
│   ├── interfaces/
│   │   ├── books.interface.ts        # IBook interface
│   │   └── borrow.interface.ts       # IBorrow interface
│   └── models/
│       ├── books.model.ts            # Book schema and methods
│       └── borrow.model.ts           # Borrow schema
├── app.ts                            # Express app configuration
├── server.ts                         # Server entry point
```

## 🧑‍💻 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository.
### 2. Install the necessary dependencies.
### 3. Configure Environment Variables.
### 4. Run the application.

## API Endpoints
### 📕 Books

`POST /books` – Add a new book  
`GET /books` – List books (with filters)  
**Query Parameters:**
- `filter` — genre
- `sortBy` — e.g. `createdAt`
- `sort` — `asc` or `desc`
- `limit` — number of items
`GET /books/:bookId` – Get a book by ID  
`PUT /books/:bookId` – Update a book  
`DELETE /books/:bookId` – Remove a book

### 📗 Borrow

`POST /borrow` – Borrow a book  
`GET /borrow` – Get borrow summary

## 🧹 Code Quality
- TypeScript interfaces for type safety.
- Centralized error handling.
## ✅ Status
Project is functional and ready for testing.