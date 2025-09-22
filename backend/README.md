# Nirax Search Application

A web frontend application that interfaces with the Nirax API through an Express.js backend proxy.

## Features

- Search for parts using search codes
- Clean, responsive UI
- Error handling and loading states
- JSON response display

## Setup

### Backend (Express.js)
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

### Frontend (HTML/JavaScript)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Start the frontend server:
   ```bash
   python3 -m http.server 3001
   ```
   The frontend will be available at `http://localhost:3001`

## Usage

1. Open your browser and go to `http://localhost:3001`
2. Enter a search code in the input field
3. Click the "Search" button
4. View the results displayed in JSON format below the form

## API Endpoint

The application uses the `/api/search/:code` endpoint which:
- Accepts a search code as a URL parameter
- Proxies requests to the external Nirax API
- Returns JSON data about parts matching the search code

## Project Structure

```
/
├── app.js                 # Express backend server
├── package.json           # Backend dependencies
├── frontend/              # Frontend application
│   └── index.html         # Main search interface
└── README.md              # This file
```

## Alternative Frontend Setup (React)

If you prefer a React-based frontend, you can use the React components in the `src/` directory, but you'll need to resolve the dependency issues first.
