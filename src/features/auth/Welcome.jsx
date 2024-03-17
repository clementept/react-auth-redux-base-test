import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user}!` : "Welcome!";

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>
        <Link to="/userslist">Go to the Users List</Link>
      </p>
      <p>
        <Link to="/flexplayground">Flex Playground</Link>
      </p>
      <p>
        <Link to="/gridplayground">Grid Playground</Link>
      </p>
    </section>
  );

  return content;
};
export default Welcome;
