import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import styles from "./Logout.module.css";

import { useLogoutMutation } from "./authApiSlice";

const Logout = () => {
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleOnClick = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className={styles.logout_button_wrapper}>
      <button className={styles.logout_button} onClick={handleOnClick}>
        <FontAwesomeIcon icon={faPowerOff} color="white" cursor="pointer" />
      </button>
    </div>
  );
};

export default Logout;
