import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Promo } from '../../types/promo-type';
import { CamerasData } from '../../types/state-type';
import { fetchCamerasAction, fetchPromoCameraAction } from '../api-actions';

const initialState: CamerasData = {
  cameras: [],
  promo: {} as Promo,
  isDataLoaded: false,
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchPromoCameraAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchPromoCameraAction.pending, (state) => {
        state.isDataLoaded = true;
      });
  }
});
