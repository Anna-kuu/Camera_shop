import { createSlice } from '@reduxjs/toolkit';
import { DataLoadingStatus, NameSpace } from '../../const';
import { Camera } from '../../types/cameras-type';
import { CameraData } from '../../types/state-type';
import { fetchCameraByIdAction, fetchSimilarCamerasAction } from '../api-actions';

const initialState: CameraData = {
  camera: {} as Camera,
  similarCameras: [],
  dataLoadingStatus: DataLoadingStatus.Idle,
};

export const cameraData = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCameraByIdAction.pending, (state) => {
        state.dataLoadingStatus = DataLoadingStatus.Pending;
      })
      .addCase(fetchCameraByIdAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.dataLoadingStatus = DataLoadingStatus.Fulfilled;
      })
      .addCase(fetchCameraByIdAction.rejected, (state) => {
        state.dataLoadingStatus = DataLoadingStatus.Rejected;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      });
  }
});
