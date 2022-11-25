import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
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
    try {
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
        camerasCount: headers['x-total-count']};
    } catch (error) {
      toast.error('Unable to load cameras. Try again later');
      throw (error);
    }
  }
);

export const fetchCamerasMinMaxPrice = createAsyncThunk<{ minPriceOfCameras: number; maxPriceOfCameras: number }, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamerasOfMinMaxPrice',
  async (_arg, {extra: api}) => {
    const responseCameraMinPrice = await api.get<Cameras>(APIRoute.Cameras, {
      params: {
        [QueryParams.Order]: OrderType.Asc,
        [QueryParams.Sort]: SortType.Price,
        [QueryParams.Limit]: 1
      }
    });
    const responseCameraMaxPrice = await api.get<Cameras>(APIRoute.Cameras, {
      params: {
        [QueryParams.Order]: OrderType.Desc,
        [QueryParams.Sort]: SortType.Price,
        [QueryParams.Limit]: 1
      }
    });

    return {
      minPriceOfCameras: responseCameraMinPrice.data[0].price,
      maxPriceOfCameras: responseCameraMaxPrice.data[0].price,
    };
  }
);

export const fetchCamerasMinMaxPriceFiltered = createAsyncThunk<{ minPriceOfCamerasFiltered: number; maxPriceOfCamerasFiltered: number }, {
  params: {
    category: string[];
    type: string[];
    level: string[];
    minPrice: string | null;
    maxPrice: string | null;
  };
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamerasOfMinMaxPriceFiltered',
  async ({params}, {extra: api}) => {
    const responseCameraMinPriceFiltered = await api.get<Cameras>(APIRoute.Cameras, {
      params: {
        [QueryParams.Order]: OrderType.Asc,
        [QueryParams.Sort]: SortType.Price,
        [QueryParams.Category]: params.category,
        [QueryParams.Type]: params.type,
        [QueryParams.Level]: params.level,
        [QueryParams.MinPrice]: params.minPrice,
        [QueryParams.MaxPrice]: params.maxPrice,
        [QueryParams.Limit]: 1
      }
    });
    const responseCameraMaxPriceFiltered = await api.get<Cameras>(APIRoute.Cameras, {
      params: {
        [QueryParams.Order]: OrderType.Desc,
        [QueryParams.Sort]: SortType.Price,
        [QueryParams.Category]: params.category,
        [QueryParams.Type]: params.type,
        [QueryParams.Level]: params.level,
        [QueryParams.MinPrice]: params.minPrice,
        [QueryParams.MaxPrice]: params.maxPrice,
        [QueryParams.Limit]: 1
      }
    });

    return {
      minPriceOfCamerasFiltered: responseCameraMinPriceFiltered.data[0].price,
      maxPriceOfCamerasFiltered: responseCameraMaxPriceFiltered.data[0].price,
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
    try {
      const {data} = await api.get<Promo>(APIRoute.Promo);
      return data;
    } catch (error) {
      toast.error('Unable to load promo cameras. Try again later');
      throw (error);
    }
  }
);

export const fetchCameraByIdAction = createAsyncThunk<Camera, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameraById',
  async (id, {extra: api}) => {
    try {
      const {data} = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);
      return data;
    } catch (error) {
      toast.error('Unable to load camera. Try again later');
      throw(error);
    }
  }
);

export const fetchSimilarCamerasAction = createAsyncThunk<Cameras, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarCameras',
  async (id, {extra: api}) => {
    try {
      const {data} = await api.get<Cameras>(`${APIRoute.Cameras}/${id}/similar`);
      return data;
    } catch (error) {
      toast.error('Failed to load similar cameras. Try again later');
      throw(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, {extra: api}) => {
    try {
      const {data} = await api.get<Reviews>(`${APIRoute.Cameras}/${id}/reviews`);
      return data;
    } catch (error) {
      toast.error('Failed to load reviews. Try again later');
      throw(error);
    }
  },
);

export const addReviewAction = createAsyncThunk<void, ReviewPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addReview',
  async(review, {dispatch, extra: api}) => {
    try {
      await api.post<Review>(APIRoute.Review, review);
      dispatch(fetchReviewsAction(review.cameraId));
    } catch (error) {
      toast.error('Failed to add review. Try again later');
      throw(error);
    }
  },
);

export const fetchCamerasByNameAction = createAsyncThunk<Cameras, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamerasByName',
  async (name, {extra: api}) => {
    try {
      const {data} = await api.get<Cameras>(APIRoute.Cameras, {params: {[QueryParams.NameLike]: name}});
      return data;
    } catch (error) {
      toast.error('Failed to find cameras. Try again later');
      throw(error);
    }
  }
);
