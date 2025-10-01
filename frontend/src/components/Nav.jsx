import '../styles/LandingPage.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Nav() {
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  return (
    <div className="z-landing">
      <div style={{ height: '112px'}}>
        <header className="topbar">
          <div className="brand">
            <img src="/z-logo.png" alt="Z logo" className="logo-img" />
          </div>

          <nav className="tabs">
            <button className="tab active">For personal</button>
            <button className="tab">For business</button>
          </nav>

          <nav className="links">
            <a href="#">Z App</a>
            <a href="#">About Z</a>

            {!user ? (
              <button
                className="login"
                aria-haspopup="dialog"
                aria-expanded={loginOpen}
              >
                Login
              </button>
            ) : (
              <div className="userMenu">
                <button className="avatar-btn" aria-haspopup="menu">
                  <span className="avatar-pill">{initials}</span>
                  <span className="avatar-name">{user.name}</span>
                </button>
                <div className="userMenu__dropdown" role="menu">
                  <button className="dropdown-item" onClick={handleLogout}>
                    Log out
                  </button>
                </div>
              </div>
            )}
          </nav>
        </header>

        {/* ======= MAIN NAV ======= */}
        <div className="mainnav">
          <a href="#">At the station ▾</a>
          <a href="#">Power ▾</a>
          <a href="#">Rewards and promotions ▾</a>
          <a href="#">Locations</a>
        </div>
      </div>
    </div>
  )
}

export default Nav