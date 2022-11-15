import { configureMockStore } from '@jedmao/redux-mock-store';
import { DataLoadingStatus, REVIEWS_COUNT_DEFAULT } from '../const';
import { DEFAULT_CAMERAS_TOTAL_COUNT, makeFakeCamera, makeFakeCameras, makeFakePromoCamera, makeFakeReviews } from './mocks';

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
    dataLoadingStatus: DataLoadingStatus.Idle,
    camerasCount: DEFAULT_CAMERAS_TOTAL_COUNT,
    camerasByName: cameras,
    minPriceOfCameras: 0,
    maxPriceOfCameras: 0,
  },
  CAMERA: {
    camera: camera,
    similarCameras: cameras,
    dataLoadingStatus: DataLoadingStatus.Idle,
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
