import { Promo } from '../../types/promo-type';
import { PromoData } from '../../types/state-type';
import { makeFakePromoCamera } from '../../utils/mocks';
import { fetchPromoCameraAction } from '../api-actions';
import { promoData } from './promo-data';

const promo = makeFakePromoCamera();

describe('Reducer: promoData', () => {
  let state: PromoData;

  beforeEach(() => {
    state = {
      promo: {} as Promo,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(promoData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchPromoCameraAction test', () => {
    it('should update promo by load prromo', () => {
      expect(promoData.reducer(state, {type: fetchPromoCameraAction.fulfilled.type, payload: promo}))
        .toEqual({
          promo: promo,
        });
    });
  });
});
