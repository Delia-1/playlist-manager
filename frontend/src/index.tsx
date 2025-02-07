import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./style/index.css";
import App from "./App";
import { ThemeProvider } from "./ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
