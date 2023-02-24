import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Signup from './components/Signup'
import { AuthProvider } from './contexts/AuthContext'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import PrivateRoutes from './components/PrivateRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route element={<Dashboard/>} path="/" exact/>
          </Route>          
          <Route path='/signup' element={<Signup/>  }/>
            <Route path='/login' element={<Login/>  }/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
