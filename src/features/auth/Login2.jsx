import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { LoadingSpinner } from "../../app/components/LoadingSpinner";

const Login2 = () => {
  // const userRef = useRef();
  // const errRef = useRef();
  const [userEmail, setUserEmail] = useState("");
  const [pwd, setPwd] = useState("");
  // const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [userEmail, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({
        username: userEmail,
        password: pwd,
      }).unwrap();
      dispatch(setCredentials({ ...userData, email: userEmail }));
      setUserEmail("");
      setPwd("");
      navigate("/welcome");
    } catch (err) {
      console.log(JSON.stringify(err));
      if (!err?.status) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.status === 422) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 403) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      // errRef.current.focus();
    }
  };

  const handleUserEmailInput = (e) => setUserEmail(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="login2">
      <div className="p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h3>Log in</h3>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            value={userEmail}
                            onChange={handleUserEmailInput}
                            required
                          />
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={pwd}
                            onChange={handlePwdInput}
                            required
                          />
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                        </div>
                      </div>
                      {/* <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          name="remember_me"
                          id="remember_me"
                        />
                        <label
                          className="form-check-label text-secondary"
                          for="remember_me"
                        >
                          Keep me logged in
                        </label>
                      </div>
                    </div> */}
                      <div className="col-12">
                        <div className="d-grid">
                          <button className=" btn btn-dark" onClick={handleSubmit}>
                            Log in now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row">
                  <div className="col-12">
                    <hr className="mt-5 mb-4 border-secondary-subtle" />
                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                      <a href="#!" className="link-secondary text-decoration-none">
                        Create new account
                      </a>
                      <a href="#!" className="link-secondary text-decoration-none">
                        Forgot password
                      </a>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return content;
};

export default Login2;
