import { createSlice } from '@reduxjs/toolkit';
import { dataLoadingStatus, NameSpace } from '../../const';
import { Camera } from '../../types/cameras-type';
import { CameraData } from '../../types/state-type';
import { fetchCameraByIdAction, fetchSimilarCamerasAction } from '../api-actions';

const initialState: CameraData = {
  camera: {} as Camera,
  similarCameras: [],
  dataLoadingStatus: dataLoadingStatus.Idle,
};

export const cameraData = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCameraByIdAction.pending, (state) => {
        state.dataLoadingStatus = dataLoadingStatus.Pending;
      })
      .addCase(fetchCameraByIdAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.dataLoadingStatus = dataLoadingStatus.Fulfilled;
      })
      .addCase(fetchCameraByIdAction.rejected, (state) => {
        state.dataLoadingStatus = dataLoadingStatus.Rejected;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      });
  }
});
