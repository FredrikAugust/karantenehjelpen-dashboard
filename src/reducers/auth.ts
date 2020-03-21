import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = { user: firebase.User | null; loaded: boolean };

const initialState: AuthState = { user: null, loaded: false };

export default createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setUser: (state, action: PayloadAction<firebase.User | null>) => {
      state.user = action.payload;
      state.loaded = true;
    },
  },
});
