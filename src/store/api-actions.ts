import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, MAX_CAMERAS_OF_PAGE, OrderType, QueryParams, SortType } from '../const';
import { Camera, Cameras, FetchCamerasPayloadType } from '../types/cameras-type';
import { Promo } from '../types/promo-type';
import { Review, ReviewPost, Reviews } from '../types/review-type';
import { AppDispatch, State } from '../types/state-type';

export const fetchCamerasAction = createAsyncThunk<{data: Cameras; camerasCount: string}, FetchCamerasPayloadType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async ({pageId, paramsSort}, {extra: api}) => {
    const {data, headers} = await api.get<Cameras>(APIRoute.Cameras, {
      params: {
        [QueryParams.Limit]: MAX_CAMERAS_OF_PAGE,
        [QueryParams.Page]: pageId,
        [QueryParams.Order]: paramsSort._order,
        [QueryParams.Sort]: paramsSort._sort,
        [QueryParams.Category]: paramsSort.category,
        [QueryParams.Type]: paramsSort.type,
        [QueryParams.Level]: paramsSort.level,
        [QueryParams.MinPrice]: paramsSort.minPrice,
        [QueryParams.MaxPrice]: paramsSort.maxPrice,
      }
    });
    return {
      data,
      camerasCount: headers['x-total-count']
    };
  }
);

export const fetchCamerasOfMinMaxPrice = createAsyncThunk<{ minPriceOfCameras: number; maxPriceOfCameras: number }, {
  params: {
    category: string[];
    type: string[];
    level: string[];
  };
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamerasOgMinMaxPrice',
  async ({params}, {extra: api}) => {
    const responseCameraMinPrice = await api.get<Cameras>(APIRoute.Cameras, {
      params: {
        [QueryParams.Order]: OrderType.Asc,
        [QueryParams.Sort]: SortType.Price,
        [QueryParams.Category]: params.category,
        [QueryParams.Type]: params.type,
        [QueryParams.Level]: params.level,
        [QueryParams.Limit]: 1
      }
    });
    const responseCameraMaxPrice = await api.get<Cameras>(APIRoute.Cameras, {
      params: {
        [QueryParams.Order]: OrderType.Desc,
        [QueryParams.Sort]: SortType.Price,
        [QueryParams.Category]: params.category,
        [QueryParams.Type]: params.type,
        [QueryParams.Level]: params.level,
        [QueryParams.Limit]: 1
      }
    });

    return {
      minPriceOfCameras: responseCameraMinPrice.data[0].price,
      maxPriceOfCameras: responseCameraMaxPrice.data[0].price,
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
    const {data} = await api.get<Cameras>(APIRoute.Cameras, {params: {[QueryParams.NameLike]: name}});
    return data;
  }
);
