import { Outlet } from "react-router-dom";
import Logout from "../../features/auth/Logout";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";

const Layout = () => {

  const token = useSelector(selectCurrentToken); 
  return (
    <div className="layout">
      {token && <Logout />}
      <div className="layout-wrapper">
          <Outlet />
        </div>
    </div>
  );
};

export default Layout;
