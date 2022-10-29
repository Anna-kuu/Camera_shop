import {TypedUseSelectorHook, useSelector} from 'react-redux';
import { State } from '../types/state-type';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
