import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Camera, Cameras } from '../types/cameras-type';
import { Promo } from '../types/promo-type';
import { Review, ReviewPost, Reviews } from '../types/review-type';
import { AppDispatch, State } from '../types/state-type';

export const fetchCamerasAction = createAsyncThunk<Cameras, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Cameras>(APIRoute.Cameras);
    return data;
  }
);

export const fetchPromoCameraAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoCamera',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Promo>(APIRoute.Promo);
    return data;
  }
);

export const fetchCameraByIdAction = createAsyncThunk<Camera, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameraById',
  async (id, {extra: api}) => {
    const {data} = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);
    return data;
  }
);

export const fetchSimilarCamerasAction = createAsyncThunk<Cameras, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarCameras',
  async (id, {extra: api}) => {
    const {data} = await api.get<Cameras>(`${APIRoute.Cameras}/${id}/similar`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Cameras}/${id}/reviews`);
    return data;
  },
);

export const addReviewAction = createAsyncThunk<void, ReviewPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addReview',
  async(review, {dispatch, extra: api}) => {
    await api.post<Review>(APIRoute.Review, review);
    dispatch(fetchReviewsAction(review.cameraId));
  },
);
