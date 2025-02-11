🎵 Playlist Generator
A personalized AI-powered music recommendation app.

This project generates playlists based on user mood, activity, or music preference, using Anthropic AI to suggest songs and Deezer API (GraphQL & Apollo Server) to fetch album covers and streaming links.

🔗 Try it: https://playlist-manager-front.vercel.app/

  🚀 Features 🚀

🔹 Core Functionality

🎼 AI-generated playlists – Uses Anthropic's API to create music suggestions based on keywords.

📡 Deezer API integration (GraphQL) – Retrieves song cover images and direct links for playback.

🌙 Dark Mode – Fully responsive UI with a theme switcher.

🔄 Dynamic scrolling – Automatically focuses on the generated playlist using useEffect & useRef.

⚡ Real-time feedback – Loading spinner when fetching playlists.

🎨 UI & UX enhancements – Clean design with MUI for the dark mode toggle, refined details crafted with pure CSS.


🔹 Technical Stack

  Backend (Node.js + Express + GraphQL)

-REST API call to Anthropic AI (Claude- AI (dj) assistant ) to generate song recommendations.

-GraphQL API (Apollo Server) + Deezer API to fetch album covers & music streaming links.

-Express.js for the backend server.

-Rate-limiting with express-rate-limit to prevent Anthropic API over-use.

-Dotenv for security and environment configuration.


  Frontend (React + TypeScript + Vite)

-TypeScript for better type safety and scalability.

-React hooks:
  useState & useEffect for state management.
  useRef for smooth scrolling to the generated playlist.
  useContext for Dark Mode management.

-Apollo Client cache to optimize GraphQL API calls.
-React Spinner for improved user feedback.



🔹  UI & UX

-Fully responsive (Mobile-first approach).

-Dark Mode toggle for better accessibility.

-Improved user experience with smooth transitions and error handling.



  📌 Possible Improvements 📌

🔹 Performance & Optimizations

Add Framer Motion animations (e.g., playlist entry, button effects).

Optimize components with React.memo to reduce unnecessary re-renders.

Lazy load heavier components for better performance.

🔹 Data Persistence & Enhancements

Save playlists to a database (PostgreSQL / MongoDb).

Allow users to reload saved playlists.





  💡 Why This Project? 💡

This project started as a refactor of the Recipe Generator app to evolve into a music recommendation platform. It showcases:

-React, TypeScript & GraphQL knowledges.

-API consumption (REST & GraphQL).

-Frontend & backend architecture.

🎯 Designed to align with Deezer’s core mission of delivering a seamless, personalized music experience.
