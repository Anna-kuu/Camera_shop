import { NameSpace } from '../../const';
import { State } from '../../types/state-type';

export const getCamerasInBascket = (state: State) => state[NameSpace.Basket].camerasInBasket;
