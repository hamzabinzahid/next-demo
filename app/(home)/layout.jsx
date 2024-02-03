import React from 'react'
import Navbar from '../components/Navbar'

const HomeLayout = ({ children }) => {
  return (
    <div className="main-container">
      {children}
    </div>
  )
}

export default HomeLayout