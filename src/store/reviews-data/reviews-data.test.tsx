import { REVIEWS_COUNT_DEFAULT } from '../../const';
import { ReviewsData } from '../../types/state-type';
import { makeFakeReviews } from '../../utils/mocks';
import { addReviewAction, fetchReviewsAction } from '../api-actions';
import { resetCounter, reviewsData, reviewsShownCounter } from './reviews-data';

const reviews = makeFakeReviews();

describe('Reducer: cameraData', () => {
  let state: ReviewsData;

  beforeEach(() => {
    state = {
      reviews: [],
      isReviewLoading: false,
      reviewsCounter: REVIEWS_COUNT_DEFAULT,
      isReviewSending: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(reviewsData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchReviewsAction test', () => {
    it('should update reviews by load reviews', () => {
      expect(reviewsData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: reviews}))
        .toEqual({
          reviews: reviews,
          isReviewLoading: false,
          reviewsCounter: REVIEWS_COUNT_DEFAULT,
          isReviewSending: false,
        });
    });
  });

  describe('addReviewAction test', () => {

    it('should update isReviewLoading status if fulfilled.type', () => {
      expect(reviewsData.reducer(state, {type: addReviewAction.fulfilled.type}))
        .toEqual({
          reviews: [],
          isReviewLoading: false,
          reviewsCounter: REVIEWS_COUNT_DEFAULT,
          isReviewSending: false,
        });
    });
    it('should update isReviewLoading status if pending.type', () => {
      expect(reviewsData.reducer(state, {type: addReviewAction.pending.type}))
        .toEqual({
          reviews: [],
          isReviewLoading: false,
          reviewsCounter: REVIEWS_COUNT_DEFAULT,
          isReviewSending: true,
        });
    });
  });
  describe('reducer test', () => {
    it('should increment counter', () => {
      expect(reviewsData.reducer(state, reviewsShownCounter()))
        .toEqual({
          reviews: [],
          isReviewLoading: false,
          reviewsCounter: 6,
          isReviewSending: false,
        });
    });
    it('should reset counter', () => {
      expect(reviewsData.reducer(state, resetCounter()))
        .toEqual({
          reviews: [],
          isReviewLoading: false,
          reviewsCounter: 3,
          isReviewSending: false,
        });
    });
  });
});
