import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
const Navbar = () => {
  const authContext = useContext(AuthContext);

  const { logout } = authContext;

  const onLogout = () => {
    logout();
  };

  return (
    // <!-- top-nav -->
    <nav className="navbar navbar-expand-md navbar-light">
      <button
        className="navbar-toggler ml-auto mb-2 bg-light"
        type="button"
        data-toggle="collapse"
        data-target="#myNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="myNavbar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-10 col-lg-9 col-md-8 ml-auto bg-dark fixed-top py-2 top-navbar">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <h4 className="text-light text-uppercase mb-0">Dashboard</h4>
                </div>
                <div className="col-md-5">
                  <form>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search..."
                      />
                      <button
                        type="button"
                        className="btn btn-white search-button"
                      >
                        <i className="fas fa-search text-danger"></i>
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-md-3">
                  <ul className="navbar-nav">
                    <li className="nav-item icon-parent">
                      <a href="#!" className="nav-link icon-bullet">
                        <i className="fas fa-comments text-muted fa-lg"></i>
                      </a>
                    </li>
                    <li className="nav-item icon-parent">
                      <a href="#!" className="nav-link icon-bullet">
                        <i className="fas fa-bell text-muted fa-lg"></i>
                      </a>
                    </li>
                    <li className="nav-item ml-md-auto dropdown">
                      <a
                        href="#!"
                        className="nav-link dropdown-toggle text-light"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa fa-user text-light"></i> Admin
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dd_user"
                      >
                        <a
                          className="dropdown-item"
                          href="#!"
                          onClick={onLogout}
                        >
                          {" "}
                          Logout
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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

    //end of top-nav
  );
};

export default Navbar;
