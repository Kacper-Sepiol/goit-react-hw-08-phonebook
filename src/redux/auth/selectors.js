export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectContact = state => state.contacts.items;

export const selectAllContacts = state => state.contacts.allItems;

export const selectFilter = state => state.filter;
