import { NameSpace } from '../../const';
import { Camera, Cameras } from '../../types/cameras-type';
import { State } from '../../types/state-type';

export const getCameraById = (state: State): Camera => state[NameSpace.Camera].camera;
export const getSimilarCameras = (state: State): Cameras => state[NameSpace.Camera].similarCameras;
export const getDataLoadingStatus = (state: State): string => state[NameSpace.Camera].dataLoadingStatus;
