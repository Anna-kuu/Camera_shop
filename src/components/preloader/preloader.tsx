import './preloader.css';

export default function Preloader() {
  return (
    <div className="preloader" data-testid="preloader">
      <div className="preloader__row">
        <div className="preloader__item"></div>
        <div className="preloader__item"></div>
      </div>
    </div>
  );
}
