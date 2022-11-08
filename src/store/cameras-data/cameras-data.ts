import { createSlice } from '@reduxjs/toolkit';
import { CAMERAS_COUNT_DEFAULT, NameSpace } from '../../const';
import { CamerasData } from '../../types/state-type';
import { fetchCamerasAction, fetchCamerasByNameAction, fetchCamerasOfMinMaxPrice } from '../api-actions';

const initialState: CamerasData = {
  cameras: [],
  isDataLoaded: false,
  camerasCount: CAMERAS_COUNT_DEFAULT,
  camerasByName: [],
  minPriceOfCameras: 0,
  maxPriceOfCameras: 0,
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
        state.cameras = action.payload.data;
        state.camerasCount = Number(action.payload.camerasCount);
        state.isDataLoaded = false;
      })
      .addCase(fetchCamerasByNameAction.fulfilled, (state, action) => {
        state.camerasByName = action.payload;
      })
      .addCase(fetchCamerasOfMinMaxPrice.fulfilled, (state, action) => {
        state.minPriceOfCameras = action.payload.minPriceOfCameras;
        state.maxPriceOfCameras = action.payload.maxPriceOfCameras;
      });
  }
});
