import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>Welcome to this page!</h1>
      </header>
      <main>
        <p>
          This page is just a welcome page.
        </p>
        <p>&nbsp;</p>
      </main>
      <footer>
        <Link to="/login">Login</Link> OR <Link to="/login2">Login 2</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
