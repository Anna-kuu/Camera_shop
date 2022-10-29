import { Promo } from '../../types/promo-type';
import { CamerasData } from '../../types/state-type';
import { makeFakeCameras} from '../../utils/mocks';
import { fetchCamerasAction, fetchPromoCameraAction } from '../api-actions';
import { camerasData } from './cameras-data';

const cameras = makeFakeCameras();

describe('Reducer: camerasData', () => {
  let state: CamerasData;

  beforeEach(() => {
    state = {
      cameras: [],
      isDataLoaded: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(camerasData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchCamerasAction test', () => {
    it('should update cameeras by load cameras', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: cameras}))
        .toEqual({
          cameras: cameras,
          isDataLoaded: false,
        });
    });
  });
});
