 Ticket Management Web Application (Twig Version)

This is the **Twig (PHP) implementation** of the Ticket Management Web Application.  
It provides a landing page, authentication, dashboard, and full-featured ticket management (CRUD) with a consistent design, responsive layout, and accessibility compliance.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Frameworks & Libraries](#frameworks--libraries)
- [Installation & Setup](#installation--setup)
- [Folder Structure](#folder-structure)
- [Authentication & Authorization](#authentication--authorization)
- [Ticket Management (CRUD)](#ticket-management-crud)
- [UI & Design](#ui--design)
- [Accessibility & Responsiveness](#accessibility--responsiveness)
- [Test User Credentials](#test-user-credentials)
- [Known Issues](#known-issues)

---

## Features

1. **Landing Page**
   - Hero section with wavy SVG background
   - Decorative circles
   - Box-shaped feature sections
   - Responsive layout (mobile, tablet, desktop)

2. **Authentication**
   - Login & Signup pages
   - Form validation with inline error messages
   - Session management using PHP `$_SESSION`
   - Redirect unauthorized users to login

3. **Dashboard**
   - Summary statistics: Total Tickets, Open Tickets, Resolved Tickets
   - Navigation to Ticket Management
   - Logout button clears session

4. **Ticket Management**
   - Create, Read, Update, Delete tickets
   - Status-based color coding: `open` (green), `in_progress` (amber), `closed` (gray)
   - Real-time validation
   - Inline messages and flash notifications

---