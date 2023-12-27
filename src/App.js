import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register'

// import VideoJuego from './pages/VideoJuegoPage/VideoJuego'
import './App.css';

export const Context = React.createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [actualRole, setActualRole] = useState("")

  return (
    <Context.Provider value={{ token, setToken, actualRole, setActualRole}}>

      <Router>
        <div className='main'>
          <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          {/* <Route path='/juego/:id' element={<VideoJuego/>}/> */}
          </Routes>
        </div>
      </Router>

    </Context.Provider>
  );
}

export default App;
