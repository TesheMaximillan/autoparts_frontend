/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notification: {
    message: {},
    isError: false,
    isOpen: false,
  },
  alert: {
    message: '',
    isAlert: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showNotification: (state, { payload }) => {
      state.notification = payload;
    },
    hideNotification: (state) => {
      state.notification.isOpen = false;
      state.notification.isError = false;
    },
    showAlert: (state, { payload }) => {
      state.alert.message = payload;
      state.alert.isAlert = true;
    },
    hideAlert: (state) => {
      state.alert.isAlert = false;
    },
  },
});

const { actions, reducer } = uiSlice;

export const {
  showNotification, hideNotification, showAlert, hideAlert,
} = actions;
export default reducer;
