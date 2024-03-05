import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import Welcome from "../features/auth/Welcome";
import Layout from "./components/Layout";
import Public from "./components/Public";
import RequireAuth from "../features/auth/RequireAuth";
import UsersList from "../features/users/UsersList";
import PersistLogin from "../features/auth/PersistLogin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome />} />
            <Route path="userslist" element={<UsersList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
