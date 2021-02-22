import React, { useContext } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import { Link } from "react-router-dom";

const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext);

  const { logout } = authContext;

  const onLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-md navbar bg-primary">
      <a className="navbar-brand" href="#">
        <h2>
          <img src="/images/tap5.png" alt="" /> {title}
        </h2>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <div className="container-fluid">
          <div className="row">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" >
                  <Link to="/body/register">Register</Link>
                </a>
              </li>
              <li className="nav-item ml-md-auto dropdown">
                <a
                  href="#!"
                  className="nav-link dropdown-toggle text-light"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa fa-user text-light"></i> User
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dd_user"
                >
                  <a className="dropdown-item" href="#!" onClick={onLogout}>
                    {" "}
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* //  <!-- modal --> */}
      <div className="modal fade" id="sign-out">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Want to leave?</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">Press logout to leave</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
              >
                Stay Here
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* //  <!-- end of modal --> */}
    </nav>
  );
};

Navbar.defaultProps = {
  title: "GS&WC",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
