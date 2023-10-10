import * as types from "./types.user";
import axios from "axios";
import { saveData } from "../../components/utility/SetCookie";
import { BASE_URL } from "../../index";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LOGIN_LOADING });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${BASE_URL}/auth/login`,
      { email, password },
      config
    );
    saveData("token", data.token);
    // saveData("user-Detail",data.user);
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: types.USER_LOGIN_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_REGISTER_LOADING });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`${BASE_URL}/auth/register`, userData, config);
    dispatch({ type: types.USER_REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: types.USER_REGISTER_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${BASE_URL}/auth/logout`);

    dispatch({ type: types.LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: types.LOGOUT_FAIL, payload: error.response.data.message });
  }
};

export const getUserProfile = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/auth/user/${id}`, config);

    dispatch({ type: types.USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: types.USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
