import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Request = import('../declarations/Request').Request;

type RequestsState = { requests: Array<Request>; loaded: boolean };

const initialState: RequestsState = { requests: [], loaded: false };

export default createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setRequests: (state, action: PayloadAction<Array<Request>>) => {
      state.requests = action.payload;
      state.loaded = true;
    },
    fetchAllRequests: state => state,
  },
});
