import React from 'react'
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import UserReducer from './Redux/UserReducer'

// import Main from './Components/Main'
import Login from './Components/Login'
import Forgot from './Components/Forgot'
import Homepage from './Components/Homepage'

// const loginStatus = false;

class Routers extends React.Component {
  render(){
        return(
          <BrowserRouter>
            <Routes>
              <Route path="/" element= { <Login /> } />
              <Route path="/homepage" element= { <Homepage /> } />
              <Route exact path="/forgot" element= { <Forgot /> } />                        
              {/* <Route exact path="*" element={ <Navigate replace to="/" /> } /> */}
            </Routes>      
          </BrowserRouter>
        )

  }
}

export default Routers