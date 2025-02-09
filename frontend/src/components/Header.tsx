import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeezer } from "@fortawesome/free-brands-svg-icons";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import "../style/Header.css";
import { useTheme } from "../ThemeContext";
import DarkModeSwitch  from "./DarkModeCompo.tsx";


export default function Header() {

  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <nav className="header-container">
      <header>



        <FontAwesomeIcon className="ust-icon" icon={faDeezer} />
        <h3 className="header-title">Dj Claude</h3>
      </header>
      <DarkModeSwitch isDarkMode={darkMode} toggleDarkMode={toggleDarkMode} /> {/* Fixed usage */}
    </nav>
  );
}
