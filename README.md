# To-Do List Application

A simple and responsive To-Do List Application built with user authentication, CRUD functionality, and priority-based task management.

## Features

- **Login Page**: Users can log in with their existing credentials.
- **Registration Page**: New users can sign up with the following details:
  - Username
  - Password
- **Home Page**: Displays the user's to-do list items with options to manage tasks.

### To-Do List Features:

- **Search Function**: Users can search for tasks by keyword.
- **Add Task**: Users can add a new task with the following details:
  - Task Description
  - Priority Level (High, Medium, Low)
- **Delete Task**: Users can delete a task from the list.
- **Update Task**: Users can edit an existing task.
- **Priority Colors**: Use color-coding to represent priority levels:
  - Red for High
  - Yellow for Medium
  - Green for Low

### General Requirements:

- Implement **CRUD** (Create, Read, Update, Delete) operations for the to-do list items.
- Ensure the application is **responsive** and **user-friendly**.
- Use proper **validation** to prevent errors during registration and task management.
- Implement **user authentication** and **authorization** to protect user data.

## Project Setup

### Requirements:

- **Node.js** (Ensure you have Node.js installed on your machine)
- **npm** (Node Package Manager)

### Steps to Run the Project:

1. Clone the repository.
2. Install the necessary dependencies:
   ```bash
   npm install
Run the development server:
bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000 (or the port specified in your setup) to view the application.