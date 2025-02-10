  🎵 Playlist Manager
  
Playlist Manager is a web application that allows users to generate music playlists with AI-powered recommendations. The project is built using Node.js , express, TypeScript, React, Vite and GraphQL, with integration for Deezer to fetch music data.

  🚀 Technologies Used
  
📌 Frontend (React + Vite)
Vite- ease the front end building 
TypeScript – Ensures type safety and better development experience.
React Context API – Manages global state, including dark mode.
React Spinners – Displays a loading animation when fetching playlists.
CSS Modules – Handles component styling.

📌 Backend (Node.js + Express + GraphQL)
Express.js – Manages API endpoints and handles server logic for Ia reqs
GraphQL + Apollo Server – Fetches and serves playlist data efficiently.
Deezer API – Retrieves song data, including covers and streaming links.
Express Rate Limit – Prevents excessive API requests.
Dotenv – Manages environment variables securely.


  🔧 Project Development
✅ 1. Initial Setup & AI Prompt Update
Updated AI response handling to return an object instead of a string.
Refactored code to handle playlist data as an array of songs.

✅ 2. TypeScript Migration
Installed TypeScript dependencies (@types/node, @types/express, ts-node).
Created tsconfig.json for project configuration.
Converted all .jsx files to .tsx for type safety.
Defined custom TypeScript interfaces (Song, PlaylistResponse).
Fixed issues with ai.d.ts that caused import conflicts.

✅ 3. Code Formatting & Linting
Installed Prettier & ESLint to enforce consistent code style.
Configured rules for both frontend and backend.

✅ 4. UI Enhancements
Redesigned PlaylistCompo to display album covers and Deezer links.
Implemented dark mode using useContext hook.
Improved spacing, typography, and overall design for better UX.

✅ 5. GraphQL API Integration
Installed GraphQL and Apollo Server for API requests.
Created deezer.ts to fetch music data from the Deezer API.
Implemented Apollo resolvers for playlist queries.
Updated PlaylistCompo to handle new data structure.



🤝 Contributing
Feel free to contribute by submitting pull requests or opening issues!

🚀Thank your for your interest! Enjoy the music! 🎶
