import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { APIRoute, AppRoute } from '../../const';
import Camera from '../../pages/camera/camera';
import Catalog from '../../pages/catalog/catalog';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Navigate to = {APIRoute.Catalog} />}
        />
        <Route
          path={AppRoute.Catalog}
          element={<Catalog />}
        />
        <Route
          path={AppRoute.Camera}
          element={<Camera />}
        />
        <Route
          path="*"
          element={<NotFoundScreen/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
