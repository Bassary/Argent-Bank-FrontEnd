import { Route, Routes } from 'react-router-dom'
import './style/main.css'
import Home from './pages/Home'
import SingIn from './pages/SignIn'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import User from './pages/User'

function App() {


  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/signin' element={<SingIn />}/>
      <Route path='/user' element={<User />}/>
    </Routes>
    <Footer />
    </>
  )
}

export default App
