import { createSelector } from 'reselect';

const selectRequests = (state) => state.requests;

export const selectResources = createSelector(
	[selectRequests],
	(requests) => requests.resources
);
export const selectError = createSelector(
	[selectRequests],
	(requests) => requests.error
);
export const selectLoading = createSelector(
	[selectRequests],
	(requests) => requests.isLoading
);

export const selectFilter = createSelector(
	[selectRequests],
	(requests) => requests.filter
);
