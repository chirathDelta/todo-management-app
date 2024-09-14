Todo App

Project Description

Todo Management Application is a web-based project designed to help users efficiently manage their tasks. The application allows users to register, log in, and create, edit, and delete todos. Each user has their own personalized todo list, which includes features like task descriptions, start dates, and completion indicators. The app ensures data privacy by storing todos specific to each user. The application is built with modern technologies, including React, Redux Toolkit, Vite, TypeScript, and local storage, with UI components styled using Shadcn UI and Tailwind CSS.

Features

    User Registration and Authentication
    Individual Todo Management
    Add, Edit, and Delete Todos
    Todo Completion Status with Start and End Dates
    Dark Mode UI for Enhanced Visual Experience
    Persistent State Management with Redux and Local Storage

Setup and Installation Instructions
Prerequisites

    Node.js (>= 14.x)
    npm or yarn

Installation Steps

    Clone the Repository

    git clone <your-repo-url>

    cd todo-management-app

    Install Dependencies Install the necessary npm packages using:

    npm install

    Start the Development Server Run the following command to start the development server:

    npm run dev

    Open your browser and navigate to http://localhost:5173 to view the application.

    Build for Production To build the application for production, run:

    npm run build

Environment Variables (Optional)

You can set up environment variables in a .env file at the root of your project if needed.
Usage

    Register an Account: Start by registering a new account. Each user can only register once with a unique email.
    Log In: Log in using the registered credentials. Once logged in, you'll be redirected to the Todo page.
    Manage Todos:
        Add Todo: Click the "Add New Todo" button to create a new task.
        Edit Todo: Use the "Edit" button next to a todo to modify its details.
        Complete/Incomplete Todo: Toggle the status of a todo to mark it as completed or incomplete.
        Delete Todo: Remove a todo permanently by clicking the "Delete" button.
    Log Out: Click the "Logout" button to end your session.
