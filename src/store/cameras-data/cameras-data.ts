import { createSlice } from '@reduxjs/toolkit';
import { CAMERAS_COUNT_DEFAULT, NameSpace } from '../../const';
import { CamerasData } from '../../types/state-type';
import { fetchCamerasAction } from '../api-actions';

const initialState: CamerasData = {
  cameras: [],
  isDataLoaded: false,
  camerasCount: CAMERAS_COUNT_DEFAULT,
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
      });
  }
});
