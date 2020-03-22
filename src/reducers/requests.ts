import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

type Request = import('../declarations/Request').Request;

type RequestsState = { requests: Array<Request>; loaded: boolean };

const initialState: RequestsState = { requests: [], loaded: false };

export default createSlice({
  initialState,
  name: 'requests',
  reducers: {
    setRequests: (state, action: PayloadAction<Array<Request>>) => {
      state.requests = action.payload;
      state.loaded = true;
    },
    fetchAllRequests: state => state,
    updateConnectedUser: (
      state,
      action: PayloadAction<{
        uid: string;
        id: string;
        connectedUser: Request['connectedUser'];
      }>
    ) => {
      state.requests.find(r => r.id === action.payload.id)!.connectedUser =
        action.payload.connectedUser;
    },
  },
});

/**
 * This should optimally be a list of all the registered users, and use an
 * autocomplete instead of select on the frontend
 */
export const connectedUsers = createSelector(
  (store: import('..').Store) => store.requests.requests,
  (requests: RequestsState['requests']) => {
    const dict: Record<string, { name?: string; phoneNumber?: string }> = {};
    return requests.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.email]: {
          name: prev[curr.email]?.name || curr.name,
          phoneNumber: prev[curr.email]?.phoneNumber || curr.phoneNumber,
        },
      };
    }, dict);
  }
);
