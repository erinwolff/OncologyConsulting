import { Link } from 'react-router';
import { COMPANY } from '../site';

export default function NotFound() {
  return (
    <>
      <title>{`Page not found | ${COMPANY}`}</title>
      <section className="section">
        <div className="container not-found">
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist.</p>
          <Link className="btn btn--primary" to="/">Back to home</Link>
        </div>
      </section>
    </>
  );
}
