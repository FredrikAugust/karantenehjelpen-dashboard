import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = { user: firebase.User | null };

const initialState: AuthState = { user: null };

export default createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setUser: (state, action: PayloadAction<firebase.User | null>) => {
      state.user = action.payload;
    },
  },
});
