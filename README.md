# 🌌 ORION Workflow Management System

<p align="center">
  <strong>An operational and administrative management portal for task delegation, duty tracking, and workflow automation across ORION wings.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License" />
</p>

---

## 📌 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Wing Modules](#-wing-modules)
- [Tech Stack](#-tech-stack)
- [Project Directory](#-project-directory)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Overview

The **ORION Workflow Management System** is built to coordinate duties, track progress, and manage operational execution across ORION. Designed alongside the ORION Discipline Wing architecture, this system centralizes member coordination, task handoffs, and activity verification in a fast, modern dashboard interface.

---

## 🚀 Key Features

- 📋 **Task & Duty Tracking:** Assign, monitor, and verify assignments with real-time status markers (Pending, In Progress, Completed).
- 👥 **Member Activity Overview:** Track wing members, their active commitments, and overall participation.
- ⚡ **Workflow Automation:** Smooth transitions between operational stages and automated task verification.
- 📝 **Activity & Audit Logs:** Complete visibility into team actions, updates, and duty completions.
- 🎨 **Modern Interface:** Clean, dark-mode-first dashboard built with React and Tailwind CSS.

---

## 🧩 Wing Modules

| Module | Description |
| :--- | :--- |
| **Dashboard** | Central overview of active tasks, system metrics, and daily duty queues. |
| **Task Pipeline** | Interactive status board for assigning, organizing, and executing operations. |
| **Member Duties** | Directory managing individual wing assignments and operational roles. |
| **Activity Feed** | Chronological logs detailing state changes, duty handoffs, and submissions. |
| **Reports** | Operational summaries and activity documentation. |

---

## 🛠️ Tech Stack

- **Frontend:** [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State & Routing:** React Router / React Context API
- **Version Control:** Git & GitHub

---

## 📂 Project Directory

```text
ORION-workflow/
├── public/              # Static assets, logos, and icons
├── src/
│   ├── assets/          # Brand graphics and images
│   ├── components/      # UI components (Navbar, Sidebar, Modals, Cards)
│   ├── pages/           # Core wing views (Dashboard, Tasks, Members, Logs)
│   ├── context/         # Workflow state management
│   ├── utils/           # Helper utilities and data formatters
│   ├── App.jsx          # Route configuration and layout setup
│   └── main.jsx         # React application entry point
├── package.json         # Project metadata and dependencies
├── tailwind.config.js   # Tailwind theme configurations
├── vite.config.js       # Vite bundler configurations
└── README.md            # System documentation
