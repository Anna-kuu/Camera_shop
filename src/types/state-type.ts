import { DataLoadingStatus } from '../const';
import { store } from '../store';
import { Camera, Cameras } from './cameras-type';
import { Promo } from './promo-type';
import { Reviews } from './review-type';

export type AppDispatch = typeof store.dispatch;

export type State = ReturnType<typeof store.getState>;

export type CamerasData = {
  cameras: Cameras;
  dataLoadingStatus: DataLoadingStatus;
  camerasCount: number;
  camerasByName: Cameras;
  minPriceOfCameras: number;
  maxPriceOfCameras: number;
};

export type CameraData = {
  camera: Camera;
  similarCameras: Cameras;
  dataLoadingStatus: DataLoadingStatus;
}

export type ReviewsData = {
  reviews: Reviews;
  isReviewLoading: boolean;
  reviewsCounter: number;
  isReviewSending: boolean;
}

export type PromoData = {
  promo: Promo;
};
