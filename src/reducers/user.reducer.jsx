// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const loadFromLocalStorage = () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      return {
        user: JSON.parse(user),
        token,
        loading: false,
        error: null,
      };
    }
  } catch (e) {
    console.warn("Erreur de chargement depuis localStorage", e);
  }
  return {
    user: null,
    token: null,
    loading: false,
    error: null,
  };
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', { email, password });
        localStorage.setItem('token', response.data.body.token);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      return response.data;
    } catch (err) {
      return rejectWithValue("Informations non valides");
    }
    
  },
  console.log("Réponse API"),
  console.log(localStorage.getItem('token'))
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get('http://localhost:3001/api/v1/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem('user', JSON.stringify(response.data.body)); // Adapte selon la structure de ta réponse API
      return response.data.body;
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return rejectWithValue(err.response?.data || "Échec de chargement du profil");
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: loadFromLocalStorage(),
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        if (action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
