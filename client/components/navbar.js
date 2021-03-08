import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar sticky-top navbar-dark navbar-expand-lg">
      <a className="navbar-brand">GameStore</a>
      <button
        className="navbar-toggler "
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon " />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto">
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home" className="link">
                Home
              </Link>
              <Link to="/favorites" className="link">
                Favorites
              </Link>
              <a href="#" onClick={handleClick} className="link">
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login" className="link">
                Login
              </Link>
              <Link to="/signup" className="link">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
