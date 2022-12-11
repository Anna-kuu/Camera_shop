import { NameSpace } from '../../const';
import { State } from '../../types/state-type';

export const getCamerasInBasket = (state: State) => state[NameSpace.Basket].camerasInBasket;
export const getDiscountLoadingStatus = (state: State): string => state[NameSpace.Basket].discountLoadingStatus;
export const getDiscount = (state: State): number => state[NameSpace.Basket].discount;
