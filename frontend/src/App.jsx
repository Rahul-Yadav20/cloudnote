import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'


import NoteState from './context/notes/NoteState'

import Signup from './components/Authentication/Signup'
import Login from './components/Authentication/Login'
import Alert from './components/Alert'
// import About2 from './components/About2'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type })

    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }



  return (
    <>
     
        <NoteState>
          <BrowserRouter>
            <Navbar />
            <Alert alert={alert} />
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert} />}></Route>
              <Route path='/about' element={<About />}></Route>

              <Route path='/signup' element={<Signup showAlert={showAlert} />}></Route>
              <Route path='/login' element={<Login showAlert={showAlert} />}></Route>
              <Route path='/register' element={<Signup />} />
              
            </Routes>
          </BrowserRouter>
        </NoteState>
    
    </>
  )
}

export default App
