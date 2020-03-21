import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  name: string;
};

const initialState: AuthState = { name: '' };

export default createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});
