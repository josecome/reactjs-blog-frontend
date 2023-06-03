import Button from './Button'
import PropTypes from 'prop-types'

const Header = ({ title }) => {
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow header">
    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/">{ title }</a>
    <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="navbar-nav">
      <div className="nav-item">
          <table>
              <tr>
                  <td><a class="nav-link px-3" href="#">{ "Test" }</a></td>
                  <td><a class="nav-link px-3" href="/logout">Sign out</a></td>
              </tr>
          </table> 
      </div>
    </div>
  </header>
  )
}

Header.defaultProps = {
  title: 'Test',
}
export default Header