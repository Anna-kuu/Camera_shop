import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, REVIEWS_COUNT_DEFAULT, REVIEWS_COUNT_STEP } from '../../const';
import { ReviewsData } from '../../types/state-type';
import { addReviewAction, fetchReviewsAction } from '../api-actions';

const initialState: ReviewsData = {
  reviews: [],
  isReviewLoading: false,
  reviewsCounter: REVIEWS_COUNT_DEFAULT,
  isReviewSending: false,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    resetCounter: (state) => {
      state.reviewsCounter = REVIEWS_COUNT_DEFAULT;
    },
    reviewsShownCounter: (state) => {
      state.reviewsCounter += REVIEWS_COUNT_STEP;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewLoading = false;
      })
      .addCase(addReviewAction.pending, (state) => {
        state.isReviewSending = true;
      })
      .addCase(addReviewAction.fulfilled, (state) => {
        state.isReviewSending = false;
      });
  }
});

export const {resetCounter, reviewsShownCounter} = reviewsData.actions;
