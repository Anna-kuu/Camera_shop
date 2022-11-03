import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, MAX_CAMERAS_OF_PAGE } from '../const';
import { Camera, Cameras } from '../types/cameras-type';
import { Promo } from '../types/promo-type';
import { Review, ReviewPost, Reviews } from '../types/review-type';
import { AppDispatch, State } from '../types/state-type';

export const fetchCamerasAction = createAsyncThunk<{data: Cameras; camerasCount: string}, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (pageId, {extra: api}) => {
    const {data, headers} = await api.get<Cameras>(APIRoute.Cameras, {params: {_limit: MAX_CAMERAS_OF_PAGE, _page: pageId}});
    return {
      data,
      camerasCount: headers['x-total-count']
    };
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

export const fetchCamerasByNameAction = createAsyncThunk<Cameras, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamerasByName',
  async (name, {extra: api}) => {
    const {data} = await api.get<Cameras>(APIRoute.Cameras, {params: {'name_like': name}});
    return data;
  }
);
