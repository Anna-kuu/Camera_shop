import { NameSpace } from '../../const';
import { State } from '../../types/state-type';

export const getCamerasInBasket = (state: State) => state[NameSpace.Basket].camerasInBasket;
