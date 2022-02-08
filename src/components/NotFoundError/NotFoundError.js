
import {
  useHistory,
} from "react-router-dom";
function NotFoundError() {
  const history = useHistory();
  return (
    <section className="not-found-error">
      <h2 className="not-found-error__text not-found-error__title">404</h2>
      <p className="not-found-error__text not-found-error__subtitle">Страница не найдена</p>
      <button className="not-found-error__btn" type="button" onClick={history.goBack}>Назад</button>
    </section>
  );
}

export default NotFoundError;