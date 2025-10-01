import '../styles/Footer.css'

function Footer() {

  return (
    <div className="z-landing">
      <footer className="footer">
          <div className="footer__cols">
            <div>
              <img src="/z-logo.png" alt="Z logo" className="logo-img pill" />
              <ul>
                <li>
                  <a href="#">At the station</a>
                </li>
                <li>
                  <a href="#">Z App</a>
                </li>
                <li>
                  <a href="#">Rewards and promotions</a>
                </li>
              </ul>
            </div>

            <div>
              <h6>For businesses</h6>
              <ul>
                <li>
                  <a href="#">Z Business fuel card</a>
                </li>
                <li>
                  <a href="#">Fuels and services</a>
                </li>
                <li>
                  <a href="#">Business tips and stories</a>
                </li>
              </ul>
            </div>

            <div>
              <h6>About Z</h6>
              <ul>
                <li>
                  <a href="#">Our story</a>
                </li>
                <li>
                  <a href="#">Our people</a>
                </li>
                <li>
                  <a href="#">Sustainability</a>
                </li>
                <li>
                  <a href="#">Careers at Z</a>
                </li>
              </ul>
            </div>

            <div>
              <button className="cta-secondary">Contact us</button>
              <div className="apps">
                <div className="store">Google Play</div>
                <div className="store">App Store</div>
              </div>
            </div>
          </div>

          <div className="footer__legal">
            <a href="#">Privacy</a>
            <a href="#">Terms of use</a>
            <a href="#">Investor relations</a>
            <span>© Z Energy Limited</span>
          </div>
        </footer>
      </div>
  )
}

export default Footer