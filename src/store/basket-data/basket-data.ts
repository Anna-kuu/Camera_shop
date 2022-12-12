import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataLoadingStatus, NameSpace } from '../../const';
import { Camera } from '../../types/cameras-type';
import { BasketData } from '../../types/state-type';
import { couponPost, orderPost } from '../api-actions';

const DEFAULT_DISCOUNT = 0;

const initialState: BasketData = {
  camerasInBasket: [],
  discount: DEFAULT_DISCOUNT,
  discountLoadingStatus: DataLoadingStatus.Idle,
  orderPostLoadingStatus: DataLoadingStatus.Idle,
};

export const basketData = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addCameraToBasket: (state, action: PayloadAction<Camera>) => {
      const index = state.camerasInBasket.findIndex(({camera}) => camera.id === action.payload.id);
      if (index >= 0) {
        state.camerasInBasket[index].cameraCount++;
        return;
      }
      state.camerasInBasket.push({
        camera: action.payload,
        cameraCount: 1,
      });
    },
    changeCameraCount: (state, action: PayloadAction<{id: number; value: number}>) => {
      const index = state.camerasInBasket.findIndex(({camera}) => camera.id === action.payload.id);
      state.camerasInBasket[index].cameraCount = action.payload.value;
    },
    removeCamera: (state, action: PayloadAction<Camera>) => {
      state.camerasInBasket = state.camerasInBasket.filter(({camera}) => camera.id !== action.payload.id);
    },
    changeOrderPostLoadingStatus: (state, action: PayloadAction<DataLoadingStatus>) => {
      state.orderPostLoadingStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(couponPost.pending, (state) => {
        state.discountLoadingStatus = DataLoadingStatus.Pending;
      })
      .addCase(couponPost.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.discountLoadingStatus = DataLoadingStatus.Fulfilled;
      })
      .addCase(couponPost.rejected, (state) => {
        state.discountLoadingStatus = DataLoadingStatus.Rejected;
        state.discount = DEFAULT_DISCOUNT;
      })
      .addCase(orderPost.pending, (state) => {
        state.orderPostLoadingStatus = DataLoadingStatus.Pending;
      })
      .addCase(orderPost.fulfilled, (state) => {
        state.orderPostLoadingStatus = DataLoadingStatus.Fulfilled;
      })
      .addCase(orderPost.rejected, (state) => {
        state.orderPostLoadingStatus = DataLoadingStatus.Rejected;
      });
  }
});

export const {addCameraToBasket, changeCameraCount, removeCamera, changeOrderPostLoadingStatus} = basketData.actions;
