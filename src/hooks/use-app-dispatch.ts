import { useDispatch } from 'react-redux';
import { AppDispatch } from '../types/state-type';

export const useAppDispatch = () => useDispatch<AppDispatch>();
