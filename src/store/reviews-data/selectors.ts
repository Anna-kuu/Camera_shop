import { NameSpace } from '../../const';
import { Reviews } from '../../types/review-type';
import { State } from '../../types/state-type';

export const getReviews = (state: State): Reviews => state[NameSpace.Reviews].reviews;
export const getReviewsCounter = (state: State): number => state[NameSpace.Reviews].reviewsCounter;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Reviews].isDataLoaded;
export const getIsReviewSending = (state: State): boolean => state[NameSpace.Reviews].isReviewSending;
