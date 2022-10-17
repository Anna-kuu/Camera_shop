import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ReviewsData } from '../../types/state-type';
import { fetchReviewsAction } from '../api-actions';

const initialState: ReviewsData = {
  reviews: [],
  isDataLoaded: false,
  reviewsCounter: 3,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    resetCounter: (state) => {
      state.reviewsCounter = 3;
    },
    reviewsShownCounter: (state) => {
      state.reviewsCounter += 3;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isDataLoaded = false;
      });
  }
});

export const {resetCounter, reviewsShownCounter} = reviewsData.actions;
