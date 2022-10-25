import { Review } from './types/review-type';

export const reviewSort = (a: Review, b: Review) => Date.parse(b.createAt) - Date.parse(a.createAt);

export const dateReview = (date: string) => new Date(date).toLocaleDateString('ru-Ru', {day: 'numeric', month: 'long'});
