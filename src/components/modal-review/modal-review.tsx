import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RatingTitle } from '../../const';
import { useAppDispatch } from '../../hooks';
import useKeydown from '../../hooks/use-keydown';
import { addReviewAction } from '../../store/api-actions';
import { ReviewPost } from '../../types/review-type';

const MAX_RATING_VALUES = 5;
const RATING_VALUES = Array.from({ length: MAX_RATING_VALUES }, (it, index) => index + 1).reverse();


type ModalReviewProps = {
  isModalReviewActive: boolean;
  setIsModalReviewActive: (status: boolean) => void;
  setIsModalReviewSuccessActive: (status: boolean) => void;
  idCamera: number;
};

export default function ModalReview({isModalReviewActive, setIsModalReviewActive, setIsModalReviewSuccessActive, idCamera}: ModalReviewProps): JSX.Element {
  useKeydown('Escape', () => setIsModalReviewActive(false));
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(0);
  const {
    register,
    formState: {
      errors,
      isValid
    },
    handleSubmit,
    reset,
  } = useForm<ReviewPost>({
    mode: 'all'
  });

  const onSubmit = handleSubmit((review) => {
    const reviewData = {
      ...review,
      cameraId: idCamera,
      rating: Number(review.rating),
    };
    dispatch(addReviewAction(reviewData));
    reset();
    setIsModalReviewActive(false);
    setIsModalReviewSuccessActive(true);
  });

  return (
    <div className={`modal ${isModalReviewActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div onClick={() => setIsModalReviewActive(false)} className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={onSubmit}>
              <div className="form-review__rate ">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {RATING_VALUES.map((index) => (
                        <Fragment key={`star-${index}`}>
                          <input className="visually-hidden" id={`star-${index}`} type="radio" {...register('rating', {required: true})} value={index} onChange={() => setRating(index)} />
                          <label className="rate__label" htmlFor={`star-${index}`} title={RatingTitle[index]}></label>
                        </Fragment>
                      ))}
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{rating}</span>
                      <span>/</span>
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  {errors?.rating && <p className="rate__message">Нужно оценить товар</p>}
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input data-testid='userName' type="text" placeholder="Введите ваше имя" {...register('userName', {required: true})}/>
                  </label>
                  {errors?.userName && <p className="custom-input__error">Нужно указать имя</p>}
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" placeholder="Основные преимущества товара" {...register('advantage', {required: true})}/>
                  </label>
                  {errors?.advantage && <p className="custom-input__error">Нужно указать достоинства</p>}
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" placeholder="Главные недостатки товара" {...register('disadvantage', {required: true})} />
                  </label>
                  {errors?.disadvantage && <p className="custom-input__error">Нужно указать недостатки</p>}
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea placeholder="Поделитесь своим опытом покупки"
                      {...register('review', {
                        required: 'Нужно добавить комментарий',
                        minLength: {
                          value: 5,
                          message: 'Минумум 5 символов'
                        }})
                      }
                    >
                    </textarea>
                  </label>
                  {errors?.review && <div className="custom-textarea__error">{errors.review.message}</div>}
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit" disabled={!isValid}>Отправить отзыв</button>
            </form>
          </div>
          <button onClick={() => setIsModalReviewActive(false)} className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
