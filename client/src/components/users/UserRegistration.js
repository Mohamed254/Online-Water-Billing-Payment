import React, { Fragment, useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import UserContext from "../../context/user/userContext";
import { Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

const UserRegistration = (props) => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  const { isAuthenticated } = authContext;

  const { addUser } = userContext;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/admin");
    }
    // //clear errors
    // clearErrors();
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  // const { addUser } = userContext();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    location: "",
    address: "",
    password: "",
    confirmpassword: "",
  });

  const {
    firstname,
    lastname,
    email,
    phone,
    location,
    address,
    password,
    confirmpassword,
  } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    
    addUser({
      firstname,
      lastname,
      email,
      phone,
      location,
      address,
      password,
      confirmpassword,
    });
    props.history.push("/UserRegistration")
    console.log({addUser});
  };

  return (
    <Fragment>
      <Navbar />
      <Sidebar />
      {/* <!-- cards --> */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row pt-md-5 mt-md-3 mb-5">
                <div className="col-md-12 mb-3">
                  <div className="card">
                    <div className="card-header">
                      User Registration
                      <button className=" btn btn-primary float-right ">
                        <Link
                          to="/UserRegistration"
                          className=" nav-link text-white"
                        >
                          Check Registered Users
                        </Link>
                      </button>
                    </div>

                    <div className="card-body">
                      <form onSubmit={onSubmit}>
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <label for="inputName1"></label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputName1"
                              placeholder="First Name"
                              name="firstname"
                              value={firstname}
                              onChange={onChange}
                              required
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <label for="inputName3"></label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputName3"
                              placeholder="Last Name"
                              name="lastname"
                              value={lastname}
                              onChange={onChange}
                              required
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <label for="inputEmail1"></label>
                            <input
                              type="email"
                              className="form-control"
                              id="inputEmail1"
                              placeholder="Email"
                              name="email"
                              value={email}
                              onChange={onChange}
                              required
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <label for="inputPhone1"></label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputPhone1"
                              placeholder="Phone"
                              name="phone"
                              value={phone}
                              onChange={onChange}
                              required
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label for="inputLoction1">Locaion/street</label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputLocation1"
                              placeholder="Location"
                              name="location"
                              value={location}
                              onChange={onChange}
                              required
                            />
                          </div>

                          <div className="form-group col-md-6">
                            <label for="inputAddress1">Home Address</label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputAddress1"
                              placeholder="Address No"
                              name="address"
                              value={address}
                              onChange={onChange}
                              required
                            />
                          </div>

                          <div className="form-group col-md-6">
                            <label for="inputPassword1">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="inputPassword1"
                              placeholder="Password"
                              name="password"
                              value={password}
                              onChange={onChange}
                              required
                              minLength="6"
                            />
                          </div>

                          <div className="form-group col-md-6">
                            <label for="inputPassword2">Confirm Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="inputPassword2"
                              placeholder="Confirm Password"
                              name="confirmpassword"
                              value={confirmpassword}
                              onChange={onChange}
                              required
                              minLength="6"
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <button
                              className="btn btn-success btn-block btn-lg"
                              type="submit"
                              onChange={onChange}
                            >
                              Register User
                            </button>
                          </div>
                        </div>
                      </form>
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

export default UserRegistration;
