import { Outlet, ScrollRestoration } from 'react-router';
import Header from './Header';
import Footer from './Footer';

export default function Root() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
