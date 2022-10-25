import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../utils/mock-store';
import HistoryRouter from '../history-route/history-route';
import userEvent from '@testing-library/user-event';
import ModalReview from './modal-review';

describe('Component: ModalReview', () => {
  it ('should render corectly', async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalReview isModalReviewActive setIsModalReviewActive={() => true} setIsModalReviewSuccessActive={() => false} idCamera={3}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Ваше имя')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('userName'), 'myName');
    expect(screen.getByDisplayValue(/myName/i)).toBeInTheDocument();
  });
});
