import { Outlet } from "react-router-dom";
import Logout from "../../features/auth/Logout";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";

const Layout = () => {

  const token = useSelector(selectCurrentToken); 
  return (
    <>
      {token && <Logout />}
      <Outlet />
    </>
  );
};

export default Layout;
