import { dataLoadingStatus } from '../../const';
import { Camera } from '../../types/cameras-type';
import { CameraData } from '../../types/state-type';
import { makeFakeCamera, makeFakeCameras } from '../../utils/mocks';
import { fetchCameraByIdAction, fetchSimilarCamerasAction } from '../api-actions';
import { cameraData } from './camera-data';

const similarCameras = makeFakeCameras();
const camera = makeFakeCamera();

describe('Reducer: cameraData', () => {
  let state: CameraData;

  beforeEach(() => {
    state = {
      camera: {} as Camera,
      similarCameras: [],
      dataLoadingStatus: dataLoadingStatus.Idle,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(cameraData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchCameraByIdAction test', () => {
    it('should update camera by load camera', () => {
      expect(cameraData.reducer(state, {type: fetchCameraByIdAction.fulfilled.type, payload: camera}))
        .toEqual({
          camera: camera,
          similarCameras: [],
          dataLoadingStatus: dataLoadingStatus.Fulfilled,
        });
    });
  });

  describe('fetchSimilarCamerasAction test', () => {
    it('should update similarCameras by load similarCameras', () => {
      expect(cameraData.reducer(state, {type: fetchSimilarCamerasAction.fulfilled.type, payload: similarCameras}))
        .toEqual({
          camera: {} as Camera,
          similarCameras: similarCameras,
          dataLoadingStatus: dataLoadingStatus.Idle,
        });
    });
  });
});
