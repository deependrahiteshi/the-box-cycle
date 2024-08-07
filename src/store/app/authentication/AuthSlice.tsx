import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import * as url from "../../../utils/urlHelper";
import axios from "axios";

interface StateType {
  passwordUpdateState: {
    status?: number;
    data?: any;
  };
}

const initialState: StateType = {
  passwordUpdateState: {},
};

export const AuthSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    passwordUpdate: (state: StateType, action) => {
      state.passwordUpdateState = {
        status: action.payload.status,
        data: action.payload.data,
      };
    },
  },
});

export const { passwordUpdate } = AuthSlice.actions;

export const updateUserPassword =
  (payload: any) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(`${url.CHANGE_USER_PASSWORD}`, payload);
      // Pass only serializable parts to the action
      dispatch(
        passwordUpdate({
          status: response.status,
          data: response.data,
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

export default AuthSlice.reducer;
