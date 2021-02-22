import React, { Fragment, useContext, useEffect } from "react";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Spinner from "./Spinner";
import AuthContext from "../../context/auth/authContext";
import UserContext from "../../context/user/userContext";
// import { GET_USERS } from "../../context/types";
const Content = (props) => {
  const authContext = useContext(AuthContext);

  const userContext = useContext(UserContext);

  const { loaduser } = userContext;

  const { isAuthenticated, clearErrors, loading } = authContext;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/admin");
    }
    //loading user
    loaduser();

    //get user
    
    //clear all errors
    clearErrors();
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);
  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
    <Navbar />
      <Sidebar />
      {/* <!-- cards --> */}
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row pt-md-5 mt-md-3 mb-5">
                <div className="col-xl-3 col-sm-6 p-2">
                  <div className="card card-common">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <i className="fas fa-shopping-cart fa-3x text-warning"></i>
                        <div className="text-right text-secondary">
                          <h5>Payments Made</h5>
                          <h3>13,000</h3>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-secondary">
                      <i className="fas fa-sync mr-3"></i>
                      <span>Updated Now</span>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 p-2">
                  <div className="card card-common">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <i className="fas fa-users fa-3x text-danger"></i>
                        <div className="text-right text-secondary">
                          <h5>Users</h5>
                          <h3>45,000</h3>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-secondary">
                      <i classn="fas fa-sync mr-3"></i>
                      <span>Updated Now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end of cards --> */}
    </Fragment>
  );
};

export default Content;
