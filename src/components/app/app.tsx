import { Navigate, Route, Routes } from 'react-router-dom';
import { APIRoute, AppRoute, PAGE_DEFAULT } from '../../const';
import Basket from '../../pages/basket/basket';
import Camera from '../../pages/camera/camera';
import Catalog from '../../pages/catalog/catalog';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<Navigate to = {`${APIRoute.Catalog}/${PAGE_DEFAULT}`} />}
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
        path={AppRoute.Basket}
        element={<Basket />}
      />
      <Route
        path="*"
        element={<NotFoundScreen/>}
      />
    </Routes>
  );
}

export default App;
