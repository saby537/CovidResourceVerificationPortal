import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectUserId = createSelector([selectUser], (user) => user.userId);
export const selectMobile = createSelector([selectUser], (user) => user.mobile);
export const selectError = createSelector([selectUser], (user) => user.error);
export const selectLoading = createSelector(
	[selectUser],
	(user) => user.isLoading
);
