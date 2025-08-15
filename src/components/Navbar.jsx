import { Link, useLocation } from "react-router-dom"



function Navbar() {

  const location = useLocation()
  const isUser = location.pathname === '/user'
  const user = {name : "Tony"}

    return (
        <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="./src/assets/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isUser ?
        <>
          <i className="fa fa-user-circle"></i>{user.name}
          <Link className="main-nav-item" to="/singin">
          <i className="fa fa-sign-out"></i>
          Sign Out
          </Link>
        </> :
          <Link className="main-nav-item" to="/singin">
          <i className="fa fa-user-circle"></i>
          Sign In
          </Link> }
      </div>
    </nav>
    )
}

export default Navbar