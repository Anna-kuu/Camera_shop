import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from '../footer/footer';
import Header from '../header/header';

export default function ErrorrScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section>
          <h3 className="title title--h3">Samething went wrong</h3>
          <Link to={AppRoute.Root} className="btn btn--transparent">Вернуться на главную</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
