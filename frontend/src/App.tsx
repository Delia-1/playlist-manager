import React from 'react'
import './style/App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  console.log(import.meta.env.VITE_BACKEND_URL);



  return (
    <div className="app">
      <Header />
    <nav className="stupid-nav">
      <Main  />
    </nav>
      <Footer/>
    </div>
  )
}

export default App
