import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import UserContext from "../../context/user/userContext";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

const RegisteredUsers = (props) => {
  const authContext = useContext(AuthContext);

  const userContext = useContext(UserContext);

  const { loaduser, user, setCurrent, deleteUser, clearCurrent } = userContext;

  const { isAuthenticated } = authContext;

  // cost { _id, firstname, lastname, email, phone, address} = user;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/admin");
    }
    //loading user
    loaduser();
    //get all users users

    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const onDelete = (id) => {
    deleteUser(id);
    console.log("Deleted");
    clearCurrent();
  };
  
  return (
    <div>
      <Navbar />
      <Sidebar />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
              <div className="row pt-md-5 mt-md-3 mb-5">
                <div className="col-md-12 mb-3">
                  <div className="card">
                    <div className="card-header">
                      Users Registered
                      <button className="btn btn-primary float-right">
                        <Link
                          to="/UserRegistration/create"
                          className=" nav-link text-white"
                        >
                          Add User
                        </Link>
                      </button>
                    </div>
                    <div className="card-body">
                      <table className="table">
                        <caption>List of users</caption>
                        <thead>
                          <tr>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">email</th>
                            <th scope="col">phone</th>
                            <th scope="col">address</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {user.map((user) => (
                            <Fragment>
                              <tr>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>

                                <td>
                                  <button onClick={() => setCurrent(user) }>
                                  <Link to="/UserRegistration/edit">
                                    <i
                                      className="fas fa-pencil-alt"
                
                                    ></i>
                                  </Link>
                                  </button>
                                </td>
                                <td>
                                  <button onClick={() => onDelete(user._id)}>
                                  <i
                                    className="fas fa-trash"
                                  ></i>
                                  </button>
                                  
                                </td>
                              </tr>
                            </Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisteredUsers;
