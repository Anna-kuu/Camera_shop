import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import { makeFakeReviews } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import ReviewsList from './reviews-list';

const reviews = makeFakeReviews();
describe('Component: Reviews', () => {
  it ('should render corectly', () => {
    const history = createMemoryHistory();
    history.push('/cameras/3');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsList reviews={reviews} id={3}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText('Достоинства')).toBeInTheDocument();
  });
});
