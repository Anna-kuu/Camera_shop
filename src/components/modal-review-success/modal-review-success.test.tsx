import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import HistoryRouter from '../history-route/history-route';
import { ModalReviewSuccess } from './modal-review-success';

describe('Component: ModalReview', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalReviewSuccess isModalReviewSuccessActive setIsModalReviewSuccessActive={() => true}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
  });
});
