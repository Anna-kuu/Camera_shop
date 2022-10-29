import { configureMockStore } from '@jedmao/redux-mock-store';
import { REVIEWS_COUNT_DEFAULT } from '../const';
import { makeFakeCamera, makeFakeCameras, makeFakePromoCamera, makeFakeReviews } from './mocks';

import thunk from 'redux-thunk';

const middlewares = [thunk];

const promo = makeFakePromoCamera();
const cameras = makeFakeCameras();
const camera = makeFakeCamera();
const reviews = makeFakeReviews();

const mockStore = configureMockStore(middlewares);
export const store = mockStore({
  CAMERAS: {
    cameras: cameras,
    isDataLoaded: false,
    camerasCount: 0,
  },
  CAMERA: {
    camera: camera,
    similarCameras: cameras,
    isDataLoaded: false,
  },
  REVIEWS: {
    reviews: reviews,
    isReviewLoading: false,
    reviewsCounter: REVIEWS_COUNT_DEFAULT,
    isReviewSending: false,
  },
  PROMO : {
    promo: promo,
  }
});
