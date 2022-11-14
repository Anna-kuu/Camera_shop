import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from '../footer/footer';
import Header from '../header/header';

export default function NotFoundScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section>
          <h3 className="title title--h3">404. Page not found</h3>
          <Link to={AppRoute.Root} className="btn btn--transparent">Вернуться на главную</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
