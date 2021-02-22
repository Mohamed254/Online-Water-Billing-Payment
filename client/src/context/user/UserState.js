import React, { useReducer } from "react";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
// import uuid from "uuid";
// import { v4 as uuid } from "uuid";
// import {v4 as uuid} from "uuid";
import UserContext from "./userContext";
import userReducer from "./userReducer";

import {
  ADD_USER,
  UPDATE_USER,
  USER_LOADED,
  GET_USERS,
  DELETE_USER,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_USERS,
  CLEAR_USERS,
  CLEAR_FILTER,
  USER_ERROR,
} from "../types";

const UserState = (props) => {
  const initialState = {
    current: null,
    loading: true,
    user: [],
    error: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  //load user
  const loaduser = async () => {
    try {
      const res = await axios.get("/api/admin");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data.msg,
      });
    }
  };

  //Add user
  const addUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/admin/add", formData, config);

      dispatch({
        type: ADD_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Get users
  

  //Update user
  const updateUser = async (formData, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/admin/${id}`, formData, config);

      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.msg,
      });
    }
  };
  // Delete user
  const deleteUser = async (_id) => {
    try {
      await axios.delete(`/api/admin/${_id}`);

      dispatch({
        type: DELETE_USER,
        payload: _id,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Clear users

  //Set Current User
  const setCurrent = (user) => {
    dispatch({
      type: SET_CURRENT,
      payload: user,
    });
  };
  //Clear Current User
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };
  //Filter Users

  //clear filter

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        error: state.error,
        current: state.current,
        addUser,
        deleteUser,
        loaduser,
        setCurrent,
        clearCurrent,
        updateUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
