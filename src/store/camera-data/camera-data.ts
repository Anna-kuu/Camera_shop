import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Camera } from '../../types/cameras-type';
import { CameraData } from '../../types/state-type';
import { fetchCameraByIdAction, fetchSimilarCamerasAction } from '../api-actions';

const initialState: CameraData = {
  camera: {} as Camera,
  similarCameras: [],
  isDataLoaded: false,
};

export const cameraData = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCameraByIdAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchCameraByIdAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchSimilarCamerasAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
        state.isDataLoaded = false;
      });
  }
});
