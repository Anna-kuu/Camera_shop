import { store } from '../store';
import { Camera, Cameras } from './cameras-type';
import { Promo } from './promo-type';
import { Reviews } from './review-type';

export type AppDispatch = typeof store.dispatch;

export type State = ReturnType<typeof store.getState>;

export type CamerasData = {
  cameras: Cameras;
  promo: Promo;
  isDataLoaded: boolean;
};

export type CameraData = {
  camera: Camera;
  similarCameras: Cameras;
  isDataLoaded: boolean;
}

export type ReviewsData = {
  reviews: Reviews;
  isDataLoaded: boolean;
  reviewsCounter: number;
  isReviewSending: boolean;
}
