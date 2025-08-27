import { Route, Routes } from 'react-router-dom'
import './style/main.css'
import Home from './pages/Home'
import SingIn from './pages/SignIn'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import User from './pages/User'
import Edit from './pages/Edit'

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SingIn />} />
        <Route path='/user' element={<User />} />
        <Route path='/user/edit' element={<Edit />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
