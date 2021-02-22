import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";


const UserLogin = (props) => {

  const authContext = useContext(AuthContext);

  const alertContext = useContext(AlertContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/body");
    }
   
    if (error === "Please check your entries and try again") {
      setAlert(error, "danger");
    }
    clearErrors();
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);


  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
      e.preventDefault();
      if (email === "" || password === "") {
        setAlert("Please enter the fields", "danger");
      } else {
        login({
          email,
          password,
        });
      }
      console.log({email, password});
    };
  
  return (
    <div className="container-fluid mt-5">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="card br-10 bg-dark">
            <div className="card-header">
              <h3 className="text-center text-white">User Sign In</h3>
            </div>
            <div class="card-body">
              <form onSubmit={onSubmit}>
                <input type="hidden" name="" />{" "}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    class="form-control form-control-lg"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <button
                      type="submit"
                      className="btn btn-block btn-lg btn-primary"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
