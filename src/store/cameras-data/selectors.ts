import { NameSpace } from '../../const';
import { Cameras } from '../../types/cameras-type';
import { Promo } from '../../types/promo-type';
import { State } from '../../types/state-type';

export const getCameras = (state: State): Cameras => state[NameSpace.Cameras].cameras;
export const getPromoCamera = (state: State): Promo => state[NameSpace.Cameras].promo;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Cameras].isDataLoaded;
