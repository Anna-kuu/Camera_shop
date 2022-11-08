import { NameSpace } from '../../const';
import { Cameras } from '../../types/cameras-type';
import { State } from '../../types/state-type';

export const getCameras = (state: State): Cameras => state[NameSpace.Cameras].cameras;
export const getCamerasCount = (state: State): number => state[NameSpace.Cameras].camerasCount;
export const getCamerasByName = (state: State): Cameras => state[NameSpace.Cameras].camerasByName;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Cameras].isDataLoaded;
export const getMinPriceOfCameras = (state: State): number => state[NameSpace.Cameras].minPriceOfCameras;
export const getMaxPriceOfCameras = (state: State): number => state[NameSpace.Cameras].maxPriceOfCameras;
