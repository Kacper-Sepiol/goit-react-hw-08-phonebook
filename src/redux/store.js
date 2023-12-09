import { configureStore, createSlice } from '@reduxjs/toolkit';
import { fetchContactsThunk } from 'components/fetchContacts/FetchContacts';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    allItems: [],
    error: null,
    isLoading: false,
    filter: '',
  },
  reducers: {
    deleteContact: (state, action) => {
      const contactIdToDelete = action.payload;
      state.items = state.items.filter(
        contact => contact.id !== contactIdToDelete
      );

      state.allItems = state.allItems.filter(
        contact => contact.id !== contactIdToDelete
      );
    },
    addFilter: (state, action) => {
      state.filter = action.payload.toLowerCase();
    },
    deleteAllContactsForFilter: (state, action) => {
      state.items = [];
    },
    addFilterContact: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContactsThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
        state.allItems = state.items;
      })
      .addCase(fetchContactsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  deleteContact,
  addFilter,
  deleteAllContactsForFilter,
  addFilterContact,
} = contactsSlice.actions;

const contactsReducer = contactsSlice.reducer;

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    contacts: contactsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
