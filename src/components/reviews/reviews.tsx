import { useState } from 'react';
import { MAX_RATING } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { reviewsShownCounter } from '../../store/reviews-data/reviews-data';
import { getReviewsCounter } from '../../store/reviews-data/selectors';
import { Reviews } from '../../types/review-type';
import { dateReview } from '../../util';
import { ModalReviewSuccess } from '../modal-review-success/modal-review-success';
import ModalReview from '../modal-review/modal-review';

type reviewsProps = {
  reviews: Reviews;
  id: number;
}

export default function ReviewsList({reviews, id}: reviewsProps): JSX.Element {
  const [isModalReviewActive, setIsModalReviewActive] = useState(false);
  const [isModalReviewSuccessActive, setIsModalReviewSuccessActive] = useState(false);

  const dispatch = useAppDispatch();
  const reviewsCounter = useAppSelector(getReviewsCounter);
  const shownRevies = reviews.slice(0, reviewsCounter);
  const reviewsList = shownRevies.map((review) => (
    <li className="review-card" key={`review-${review.id}`}>
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">{dateReview(review.createAt)}</time>
      </div>
      <div className="rate review-card__rate">
        {Array.from({length: MAX_RATING}, (it, index) => (
          <svg width="17" height="16" aria-hidden="true" key={`star-${index}`}>
            <use xlinkHref={`#icon-${index < review.rating ? 'full-' : ''}star`}></use>
          </svg>
        ))}
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  ));
  return (
    <>
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button onClick={() => {setIsModalReviewActive(true); document.body.style.overflow = 'hidden';}} className="btn" type="button">Оставить свой отзыв</button>
          </div>
          <ul className="review-block__list">
            {reviewsList}
          </ul>
          {reviews.length !== shownRevies.length &&
          <div className="review-block__buttons">
            <button onClick={() => dispatch(reviewsShownCounter())} className="btn btn--purple" type="button">Показать больше отзывов
            </button>
          </div>}
        </div>
      </section>
      <ModalReview isModalReviewActive={isModalReviewActive} setIsModalReviewActive={setIsModalReviewActive} setIsModalReviewSuccessActive={setIsModalReviewSuccessActive} idCamera={id}/>
      <ModalReviewSuccess isModalReviewSuccessActive={isModalReviewSuccessActive} setIsModalReviewSuccessActive={setIsModalReviewSuccessActive}/>
    </>
  );
}
