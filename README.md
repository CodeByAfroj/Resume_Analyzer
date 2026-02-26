# Resume Analyzer

A full-stack web application that analyzes your resume and finds relevant job opportunities. Upload your resume (PDF or DOCX), and the application uses AI to understand your skills, then searches for matching job openings.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Features

- 📄 **Resume Upload**: Support for PDF and DOCX file formats
- 🤖 **AI-Powered Analysis**: Uses OpenRouter AI to generate intelligent job search queries
- 🔍 **Job Search**: Integrates with RapidAPI JSearch to find relevant job opportunities
- 💻 **Modern UI**: React frontend with Tailwind CSS styling
- ⚡ **Fast Development**: Vite for rapid development and building

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **File Processing**: Multer, pdf-parse, mammoth
- **APIs**: OpenRouter (AI), RapidAPI (Job Search)

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Linting**: ESLint

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** for cloning the repository
- API Keys (see [Environment Variables](#environment-variables) section)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ResumeAnalyzer.git
cd ResumeAnalyzer
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

## Environment Variables

You need to set up environment variables for the backend to function correctly.

### Backend Environment Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a `.env` file in the backend folder:
```bash
touch .env
```

3. Add the following environment variables to the `.env` file:

```env
# Server Configuration
PORT=5000

# OpenRouter API Key (for AI-powered resume analysis)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# RapidAPI Key (for job search functionality)
RAPIDAPI_KEY=your_rapidapi_key_here

# MongoDB Connection String (optional, if using database features)
MONGODB_URI=mongodb://localhost:27017/resume-analyzer
```

### How to Get API Keys

#### OpenRouter API Key
1. Go to [OpenRouter.ai](https://openrouter.ai/)
2. Sign up for a free account
3. Navigate to your API keys section
4. Generate a new API key
5. Copy and paste it into your `.env` file

#### RapidAPI Key
1. Go to [RapidAPI](https://rapidapi.com/)
2. Sign up for a free account
3. Search for "JSearch" in the marketplace
4. Subscribe to the API (free tier available)
5. Copy your API key from the dashboard
6. Add it to your `.env` file

### Frontend Configuration

The frontend connects to the backend API by default at `http://localhost:5000`. If you need to change this, look for API calls in the `src/` directory and update the base URL as needed.

## Running the Application

### Start the Backend Server

```bash
cd backend

# Development mode (with auto-reload using nodemon)
npm run dev

# Production mode
npm start
```

The backend will start on `http://localhost:5000` (or your configured PORT)

### Start the Frontend Development Server

In a new terminal window:

```bash
cd frontend

# Development mode
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

The frontend will typically start on `http://localhost:5173` (Vite default)

### Run Both Concurrently (Optional)

You can use a tool like `concurrently` to run both servers at once:

```bash
npm install -g concurrently

# From the root directory
concurrently "cd backend && npm run dev" "cd frontend && npm run dev"
```

## API Endpoints

### Upload Resume
- **Endpoint**: `POST /api/upload`
- **Description**: Upload a resume file (PDF or DOCX)
- **Request**: 
  - Form data with `file` field
  - Max file size: 5MB
- **Response**: 
  - Extracted resume text
  - Generated job search results

### Example Request
```bash
curl -X POST http://localhost:5000/api/upload \
  -F "file=@resume.pdf"
```

## Project Structure

```
ResumeAnalyzer/
├── backend/
│   ├── .env                 # Environment variables (create this)
│   ├── .gitignore
│   ├── package.json
│   ├── index.js            # Main server file
│   ├── controller/
│   │   └── resumeController.js
│   ├── models/
│   │   └── resumeModels.js
│   ├── utils/
│   │   ├── jobSearch.js    # RapidAPI integration
│   │   └── openRouter.js   # OpenRouter AI integration
│   ├── uploads/            # Temporary file storage
│   └── test/
│
├── frontend/
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── pages/
│   │   └── assets/
│   └── public/
│
└── README.md
```

## Troubleshooting

### Port Already in Use
If port 5000 is already in use, either:
1. Modify the `PORT` in your `.env` file
2. Kill the process using the port:
   ```bash
   # macOS/Linux
   lsof -i :5000
   kill -9 <PID>
   ```

### API Key Errors
- Ensure your `.env` file is in the `backend/` directory
- Verify that API keys are correctly copied without extra spaces
- Check that your RapidAPI and OpenRouter accounts are active

### Module Not Found Errors
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again in both backend and frontend directories

### CORS Issues
- The backend is configured with CORS enabled
- If you get CORS errors, check that the frontend is making requests to the correct backend URL

## Contributing

Feel free to open issues and submit pull requests for any improvements.

## License

This project is licensed under the ISC License.

---

**Need Help?** Check the [Troubleshooting](#troubleshooting) section or open an issue in the repository.
