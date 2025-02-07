
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import "../style/Header.css"

export default function Header() {
  return (
    <nav className="header-container">

    <header>
      <FontAwesomeIcon className="ust-icon"icon={faUtensils} />
      <h3 className="header-title">Dj Claude</h3>
    </header>
    </nav>
  )
}
