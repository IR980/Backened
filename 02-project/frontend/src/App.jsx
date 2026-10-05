import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CreatePost from './pages/CreatePost'
import HomePage from './pages/HomePage'
import Feed from './pages/Feed'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App