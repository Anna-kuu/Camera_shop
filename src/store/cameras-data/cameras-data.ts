import { createSlice } from '@reduxjs/toolkit';
import { CAMERAS_COUNT_DEFAULT, DataLoadingStatus, NameSpace } from '../../const';
import { CamerasData } from '../../types/state-type';
import { fetchCamerasAction, fetchCamerasByNameAction, fetchCamerasMinMaxPrice, fetchCamerasMinMaxPriceFiltered } from '../api-actions';

const initialState: CamerasData = {
  cameras: [],
  dataLoadingStatus: DataLoadingStatus.Idle,
  camerasCount: CAMERAS_COUNT_DEFAULT,
  camerasByName: [],
  minPriceOfCameras: 0,
  maxPriceOfCameras: 0,
  minPriceOfCamerasFiltered: 0,
  maxPriceOfCamerasFiltered: 0,
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.dataLoadingStatus = DataLoadingStatus.Pending;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload.data;
        state.camerasCount = Number(action.payload.camerasCount);
        state.dataLoadingStatus = DataLoadingStatus.Fulfilled;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.dataLoadingStatus = DataLoadingStatus.Rejected;
      })
      .addCase(fetchCamerasByNameAction.fulfilled, (state, action) => {
        state.camerasByName = action.payload;
      })
      .addCase(fetchCamerasMinMaxPrice.fulfilled, (state, action) => {
        state.minPriceOfCameras = action.payload.minPriceOfCameras;
        state.maxPriceOfCameras = action.payload.maxPriceOfCameras;
      })
      .addCase(fetchCamerasMinMaxPriceFiltered.fulfilled, (state, action) => {
        state.minPriceOfCamerasFiltered = action.payload.minPriceOfCamerasFiltered;
        state.maxPriceOfCamerasFiltered = action.payload.maxPriceOfCamerasFiltered;
      });
  }
});
