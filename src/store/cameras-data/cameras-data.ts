import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CamerasData } from '../../types/state-type';
import { fetchCamerasAction } from '../api-actions';

const initialState: CamerasData = {
  cameras: [],
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
      });
  }
});
