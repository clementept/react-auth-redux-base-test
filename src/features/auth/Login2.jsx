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
      <div class="p-3 p-md-4 p-xl-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
              <div class="card border-0 shadow-sm rounded-4">
                <div class="card-body p-3 p-md-4 p-xl-5">
                  <div class="row">
                    <div class="col-12">
                      <div class="mb-5">
                        <h3>Log in</h3>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="row gy-3 overflow-hidden">
                      <div class="col-12">
                        <div class="form-floating mb-3">
                          <input
                            type="email"
                            class="form-control"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            value={userEmail}
                            onChange={handleUserEmailInput}
                            required
                          />
                          <label for="email" class="form-label">
                            Email
                          </label>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-floating mb-3">
                          <input
                            type="password"
                            class="form-control"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={pwd}
                            onChange={handlePwdInput}
                            required
                          />
                          <label for="password" class="form-label">
                            Password
                          </label>
                        </div>
                      </div>
                      {/* <div class="col-12">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          name="remember_me"
                          id="remember_me"
                        />
                        <label
                          class="form-check-label text-secondary"
                          for="remember_me"
                        >
                          Keep me logged in
                        </label>
                      </div>
                    </div> */}
                      <div class="col-12">
                        <div class="d-grid">
                          <button class=" btn btn-dark" onClick={handleSubmit}>
                            Log in now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div class="row">
                  <div class="col-12">
                    <hr class="mt-5 mb-4 border-secondary-subtle" />
                    <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                      <a href="#!" class="link-secondary text-decoration-none">
                        Create new account
                      </a>
                      <a href="#!" class="link-secondary text-decoration-none">
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
