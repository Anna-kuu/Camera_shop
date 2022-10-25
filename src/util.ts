import dayjs from 'dayjs';
import { Review } from './types/review-type';

export const dateReview = (date: string) => dayjs(date).format('DD MMMM');
export const reviewSort = (a: Review, b: Review) => Date.parse(b.createAt) - Date.parse(a.createAt);
