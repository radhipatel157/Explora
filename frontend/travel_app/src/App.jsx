import { BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom'
import React from 'react'

import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Home/Home'
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' extract element={<Root></Root>}></Route>
          <Route path='/dashboard' extract element={<Home></Home>}></Route>
          <Route path='/login' extract element={<Login></Login>}></Route>
          <Route path='/signup' extract element={<Signup></Signup>}></Route>
        </Routes>
      </Router>
    </div>
  )
}
// Define the Root component to handle the initial redirect
const Root = () => {
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login"/>
);
};

export default App