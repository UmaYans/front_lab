import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUp: false,
  signIn: false,
  error: null,
  users: {},
  token: localStorage.getItem("token"),
  loading: false,
};

export const registerUser = createAsyncThunk(
  "add/user",
  async ({ name, lastName, login, password, telephone }, thunkAPI) => {
    try {
      const res = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, lastName, login, password, telephone }),
      });
      const data = await res.json();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: "Ошибка при регистрации:" + error.toString(),
      });
    }
  }
);

export const auth = createAsyncThunk(
  "login/user",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue({
          error: data.error,
        });
      } else {
        localStorage.setItem("token", data.token);
        return thunkAPI.fulfillWithValue(data.token);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const getUser = createAsyncThunk("get/user", async (_, thunkAPI) => {
  const state = thunkAPI.getState();

  try {
    const res = await fetch("/user", {
      headers: {
        Authorization: `Bearer ${state.user.token}`,
      },
    });
    const user = await res.json();
    if (user.error) {
      return thunkAPI.rejectWithValue({ error: user.error });
    } else {
      return thunkAPI.fulfillWithValue(user);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({
      error,
    });
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.signUp = false;
        state.error = action.payload.error;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.signUp = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.signUp = false;
        state.error = action.payload.error;
      });
    builder
      .addCase(auth.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(auth.rejected, (state, action) => {
        state.error = action.payload.error;
      });
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
