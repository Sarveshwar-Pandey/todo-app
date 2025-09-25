# Todo App

A simple Todo application built with **Node.js, Express, and Handlebars**.  
It lets you add, edit, delete, and manage your daily tasks.

---

## Features
- Add new todos
- Edit existing todos
- Delete todos  

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sarveshwar-Pandey/todo-app.git
   cd todo-app

2. Create a .env file (you can copy .env.example if provided) and set environment variables, e.g.:
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/tododb
       
2. Install dependencies:
    npm install
    
4. Start the server:
    npm start
    
5. Open your browser at:
    http://localhost:3000 or at whatever port you have set in .env file

## Project Structure

Here’s a high-level view of how things are organized:

├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── templates/
├── .env
├── constants.js
├── server.js
├── package.json
└── package-lock.json

    - `server.js` — entry point, sets up Express server  
    - `routes/` — route definitions / endpoints  
    - `controllers/` — business logic, controller functions  
    - `models/` — data models / database schemas  
    - `middleware/` — custom middleware  
    - `templates/` — Handlebars view files  
    - `config/` — configuration files (e.g. DB setup)  
    - `constants.js` — app-level constants and config  
    
    ---

Usage/Screenshots: 
  Login: <img width="1105" height="678" alt="Screenshot 2025-09-25 230840" src="https://github.com/user-attachments/assets/c87ee995-0d41-4576-b250-89edd55b851f" />

  Signup: <img width="832" height="678" alt="Screenshot 2025-09-25 230907" src="https://github.com/user-attachments/assets/adfa53b5-a275-49fd-9a8a-100af3c3e448" />

  HomePage: <img width="683" height="577" alt="Screenshot 2025-09-25 231114" src="https://github.com/user-attachments/assets/5df8de2a-7dfc-4b9b-a54d-90d938ae761c" />

  Create Todo: <img width="807" height="414" alt="Screenshot 2025-09-25 231315" src="https://github.com/user-attachments/assets/64ddad3f-3fc5-447c-ba7a-eddfe5ec893c" />

  View Todos: <img width="1887" height="491" alt="Screenshot 2025-09-25 231340" src="https://github.com/user-attachments/assets/a269ec1c-cf73-4ae3-9282-4601aaea3ddd" />

  Edit Todo: <img width="1905" height="400" alt="Screenshot 2025-09-25 231415" src="https://github.com/user-attachments/assets/f374583b-6cb0-4afd-9f8d-f3d425c032dd" />

  Edited Todo: <img width="1896" height="417" alt="Screenshot 2025-09-25 231429" src="https://github.com/user-attachments/assets/325ddbbc-09f1-431a-8364-f05b9a79d80d" />
