import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";

import {
  LOGIN_SUCCESS,
  LOGOUT,
  ADMIN_LOADED,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  AUTH_ERROR,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    admin: null,
    errror: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
 //Load admin

  const loadAdmin = async () => {
    //@todo setAuthToken
    setAuthToken(localStorage.token);
    

    try {
      const res = await axios.get("/api/auth/admin");

      dispatch({
        type: ADMIN_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };


  //login admin
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth/admin", formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadAdmin();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //logout
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  //clear error
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };


  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        admin: state.admin,
        error: state.error,
        loadAdmin,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );


};

export default AuthState
