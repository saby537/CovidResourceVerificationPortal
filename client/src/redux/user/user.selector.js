import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectUsername = createSelector(
	[selectUser],
	(user) => user.username
);
export const selectEmail = createSelector([selectUser], (user) => user.email);
export const selectError = createSelector([selectUser], (user) => user.error);
export const selectLoading = createSelector(
	[selectUser],
	(user) => user.isLoading
);
