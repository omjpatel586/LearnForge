import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profile?: string;
}

export interface UserState {
  data: IUser | null;
  loading: boolean;
}

const initialState: UserState = {
  data: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.data = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.data = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
