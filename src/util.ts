import dayjs from 'dayjs';

export const dateReview = (date: string) => dayjs(date).format('DD MMMM');
