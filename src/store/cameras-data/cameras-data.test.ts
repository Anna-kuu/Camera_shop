import { CamerasData } from '../../types/state-type';
import { makeFakeCameras} from '../../utils/mocks';
import { fetchCamerasAction } from '../api-actions';
import { camerasData } from './cameras-data';

const cameras = makeFakeCameras();

describe('Reducer: camerasData', () => {
  let state: CamerasData;

  beforeEach(() => {
    state = {
      cameras: [],
      isDataLoaded: false,
      camerasCount: 0,
      camerasByName: [],
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(camerasData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchCamerasAction test', () => {
    it('should update cameras by load cameras', () => {
      expect(camerasData.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: {data: cameras, camerasCount: '6'}}))
        .toEqual({
          cameras: cameras,
          isDataLoaded: false,
          camerasCount: 6,
          camerasByName: [],
        });
    });
  });
});
