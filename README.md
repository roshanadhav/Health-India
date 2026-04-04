# Health India

Health India is a full-stack healthcare web application designed to provide a scalable, modular, and user-friendly platform for accessing healthcare services. It focuses on clean architecture, separation of frontend and backend, and future extensibility for features like appointment booking, patient management, and online consultation.

## Live Demo

https://github.com/roshanadhav/health-india

## Project Overview

Health India simulates a real-world healthcare platform where users can interact with healthcare services through a structured digital system. The project follows a modular architecture with separate frontend and backend layers to ensure scalability, maintainability, and production readiness.

## Tech Stack

Frontend:
- HTML
- CSS
- JavaScript 

Backend:
- Node.js
- Express.js

Database:
- MongoDB

Tools:
- Git & GitHub
- REST API architecture
- Postman (optional)

## Folder Structure

health-india/
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── assets/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── App.js
│   │
│   ├── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│
├── .env
├── .gitignore
├── README.md

## Frontend Explanation

frontend/public:
Contains static files like index.html and assets.

frontend/src/components:
Reusable UI components such as buttons, navbar, cards, etc.

frontend/src/pages:
Page-level components like Home, About, Services, Contact, etc.

frontend/src/styles:
Styling files for UI design.

frontend/src/utils:
Helper functions and reusable logic.

frontend/src/App.js:
Main entry point of frontend application.

## Backend Explanation

backend/config:
Database configuration and connection setup.

backend/controllers:
Business logic for handling requests.

backend/models:
Database schemas and models.

backend/routes:
API endpoints definition.

backend/middleware:
Authentication and request validation logic.

backend/server.js:
Entry point of backend server.

## Features

- Responsive UI design
- Modular and scalable architecture
- REST API integration
- Separation of frontend and backend
- Optimized and maintainable codebase

## Installation

git clone https://github.com/roshanadhav/health-india.git  
cd health-india  

Frontend:
cd frontend  
npm install  
npm start  

Backend:
cd backend  
npm install  
npm start  

## API Endpoints

GET /api/users  
GET /api/users/:id  
POST /api/users  
PUT /api/users/:id  
DELETE /api/users/:id  

## Future Improvements

- Appointment booking system
- Online doctor consultation
- Patient record management
- Authentication system (JWT/OAuth)
- AI-based health assistant
- Notification system (email/SMS)

## Deployment

Frontend: Vercel 
Backend: Render 
Database: MongoDB Atlas  

## Contributing

Fork the repo, create a branch, make changes, and submit a pull request.

## License

MIT License

## Author

Roshan Adhav  
https://github.com/roshanadhav
