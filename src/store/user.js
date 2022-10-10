import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login, logout } from '@/api/user'

const login = createAction('login');

export const fetchUserById = createAsyncThunk('login', async () => {
  const response = login();
  return response;
});


const userSilce = createSlice({
  name: 'user',
  initialState: {
    role: '',
    name: '',
    token: '',
    data: null
  },
  reducers: {
    add: (state, role) => {
      state.role = role
    }
  },
  // http请求
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.data = action.payload.message;
    });
  }

})




export const { increment, decrement, incrementByAmount } = userSilce.actions

export default userSilce.reducer