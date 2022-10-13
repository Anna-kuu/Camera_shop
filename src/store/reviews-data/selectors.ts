import { NameSpace } from '../../const';
import { Reviews } from '../../types/review-type';
import { State } from '../../types/state-type';

const getReviews = (state: State): Reviews => state[NameSpace.Reviews].reviews;
const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Reviews].isDataLoaded;
