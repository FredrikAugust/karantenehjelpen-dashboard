import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

type Request = import('../declarations/Request').Request;

type RequestsState = { requests: Array<Request>; loaded: boolean };

const initialState: RequestsState = { requests: [], loaded: false };

// Actions for use with saga
export const sagaActions = {
  fetchAllRequests: createAction('requests/fetch-all-requests'),
};

export default createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setRequests: (state, action: PayloadAction<Array<Request>>) => {
      state.requests = action.payload;
      state.loaded = true;
    },
  },
});
