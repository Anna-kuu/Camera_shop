import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Promo } from '../../types/promo-type';
import { PromoData } from '../../types/state-type';
import { fetchPromoCameraAction } from '../api-actions';

const initialState: PromoData = {
  promo: {} as Promo,
};

export const promoData = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoCameraAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  }
});
