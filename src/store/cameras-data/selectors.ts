import { NameSpace } from '../../const';
import { Cameras } from '../../types/cameras-type';
import { State } from '../../types/state-type';

export const getCameras = (state: State): Cameras => state[NameSpace.Cameras].cameras;
export const getCamerasCount = (state: State): number => state[NameSpace.Cameras].camerasCount;
export const getCamerasByName = (state: State): Cameras => state[NameSpace.Cameras].camerasByName;
export const getLoadingDataStatus = (state: State): string => state[NameSpace.Cameras].dataLoadingStatus;
export const getMinPriceOfCameras = (state: State): number => state[NameSpace.Cameras].minPriceOfCameras;
export const getMaxPriceOfCameras = (state: State): number => state[NameSpace.Cameras].maxPriceOfCameras;

export const getMinPriceOfCamerasFiltered = (state: State): number => state[NameSpace.Cameras].minPriceOfCamerasFiltered;
export const getMaxPriceOfCamerasFiltered = (state: State): number => state[NameSpace.Cameras].maxPriceOfCamerasFiltered;
