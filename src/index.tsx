import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import browserHistory from './browser-history';
import App from './components/app/app';
import HistoryRouter from './components/history-route/history-route';
import { store } from './store';
import { fetchCamerasAction, fetchPromoCameraAction } from './store/api-actions';

store.dispatch(fetchCamerasAction());
store.dispatch(fetchPromoCameraAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory} >
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
