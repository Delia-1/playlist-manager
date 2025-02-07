import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeezer } from "@fortawesome/free-brands-svg-icons";
import "../style/Header.css";

export default function Header() {
  return (
    <nav className="header-container">
      <header>
        <FontAwesomeIcon className="ust-icon" icon={faDeezer} />
        <h3 className="header-title">Dj Claude</h3>
      </header>
    </nav>
  );
}
