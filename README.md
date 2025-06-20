# Collaborative To-Do Lists App

A modern, collaborative to-do list application built with React, TypeScript, Firebase, and Tailwind CSS. Manage your tasks, create multiple lists, and collaborate with others in real time.

## Features

- **User Authentication:** Register, log in, and log out securely with Firebase Auth.
- **List Management:** Create, edit, and delete to-do lists.
- **Task Management:** Add, edit, complete, and delete tasks within lists.
- **Collaboration:** Invite others to your lists as collaborators with admin or viewer roles.
- **Role-Based Permissions:** Only admins can manage collaborators and delete lists.
- **Optimistic UI:** Fast, responsive updates for a smooth user experience.
- **Modern UI:** Built with Tailwind CSS and Radix UI for a clean, responsive interface.

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/) (Auth, Firestore)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) for forms and validation

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd tasks-list
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Firebase Setup:**

   - The app is pre-configured with a Firebase project in `src/lib/firebase.ts`.
   - For production, create your own Firebase project and update the config in `src/lib/firebase.ts`.

4. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) to use the app.

## Usage

- **Register** a new account or **log in** with your credentials.
- **Create a new list** and add tasks to it.
- **Invite collaborators** to your lists by email (admin or viewer roles).
- **Manage tasks**: mark as complete, edit, or delete.
- **Admins** can manage collaborators and delete lists.

## Screenshots

### Dashboard

![Dashboard Screenshot](screenshots/dashboard.png)
_Dashboard view with your lists and tasks._

### Login Page

![Login Page Screenshot](screenshots/login.png)
_Login page for user authentication._

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build
- `npm run lint` — Lint the codebase

## Folder Structure

- `src/components/` — UI and feature components
- `src/pages/` — Main app pages (Dashboard, Login, Register)
- `src/services/` — Firebase service functions (auth, list, task)
- `src/context/` — React context providers (auth, admin roles)
- `src/types/` — TypeScript type definitions
- `src/lib/` — Firebase config and utilities

## License

[MIT](LICENSE)

---
