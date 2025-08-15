import { Route, Routes } from 'react-router-dom'
import './style/main.css'
import Home from './pages/Home'
import SingIn from './pages/SignIn'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import User from './pages/User'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function App() {
  const {token} = useNavigate((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/user')
    }
  }, [token, navigate])


  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/singin' element={<SingIn />}/>
      <Route path='/user' element={<User />}/>
    </Routes>
    <Footer />
    </>
  )
}

export default App
