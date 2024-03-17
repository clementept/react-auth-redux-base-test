import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import Welcome from "../features/auth/Welcome";
import Layout from "./components/Layout";
import Public from "./components/Public";
import RequireAuth from "../features/auth/RequireAuth";
import UsersList from "../features/users/UsersList";
import PersistLogin from "../features/auth/PersistLogin";
import Login2 from "../features/auth/Login2";
import FlexPlayground from "../features/flexPlayground/FlexPlayground";
import GridPlayground from "../features/gridDemo/GridPlayground";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="login2" element={<Login2 />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="flexplayground" element={<FlexPlayground />} />
            <Route path="gridplayground" element={<GridPlayground />} />
            <Route path="welcome" element={<Welcome />} />
            <Route path="userslist" element={<UsersList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
