import { NameSpace } from '../../const';
import { Promo } from '../../types/promo-type';
import { State } from '../../types/state-type';

export const getPromoCamera = (state: State): Promo => state[NameSpace.Promo].promo;
