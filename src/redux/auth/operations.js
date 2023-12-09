import { createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = `https://connections-api.herokuapp.com`;

const setAuthHeader = token => {
  headers.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  delete headers.Authorization;
};

const headers = {
  'Content-Type': 'application/json',
};

const requestOptions = (method, body, token) => {
  const options = {
    method,
    headers: { ...headers },
    body: body ? JSON.stringify(body) : undefined,
  };

  if (token) {
    setAuthHeader(token);
  }

  return options;
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await fetch(
        `${baseURL}/users/signup`,
        requestOptions('POST', credentials)
      );
      const data = await res.json();
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await fetch(
        `${baseURL}/users/login`,
        requestOptions('POST', credentials)
      );
      const data = await res.json();
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await fetch(
      `${baseURL}/users/logout`,
      requestOptions('POST', null, thunkAPI.getState().auth.token)
    );
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await fetch(
        `${baseURL}/users/current`,
        requestOptions('GET', null, persistedToken)
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
