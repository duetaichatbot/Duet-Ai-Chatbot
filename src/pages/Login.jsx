import React, { useState } from "react";
import "../../src/index.css";
import chatbot from "../assets/chatbot6.gif";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);
  const navigate = useNavigate();

  
  const [errorMessage, setErrorMessage] = useState("");
  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });

  const handleLoginFields = (e) => {
    setLoginFields({ ...loginFields, [e.target.name]: e.target.value });
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    console.log(loginFields, "xxx");
    dispatch(userLogin(loginFields))
      .then((res) => {
        if (res.payload.status === "successful") {
          navigate("/");
        } else if (res.payload.status === "failed") {
          setErrorMessage(res.payload.message);
        }
      })
      .catch((err) => {
        console.log(err, "catch error");
        setErrorMessage(err.message);
      });
  };

  return (
    <div className="login_container container-fluid">
      <div className="row login_main_row">
        <div className="col-md-8 item_login_1">
          <h3>WELCOME!</h3>
          <p>Enter your details and start your journey with us</p>
          <img src={chatbot} alt="" />

          <div className="login_form_container">
            <div>
              <h3
                className="error_msg text-center"
                style={{ fontSize: "18px" }}
              >
                {" "}
                {errorMessage}
              </h3>
            </div>

            <div className="signup_heading">
              <span className="signup_span">Login</span>
            </div>

            {/*  */}
            <form className="signup_form">
              <input
                className="email_input signup_input"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={loginFields.email}
                onChange={handleLoginFields}
              />
              <br />
              <input
                className="password_input signup_input"
                type="password"
                name="password"
                value={loginFields.password}
                onChange={handleLoginFields}
                placeholder="Enter Password"
              />
              <span>
                No account?{" "}
                <a class="createOne" href="">
                  Create one!
                </a>
              </span>

              <div className="login_btn_div mt-3">
                {loading ? (
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleUserLogin}
                  >
                    LOGIN
                  </button>
                )}
              </div>
            </form>
            {/*  */}
          </div>
        </div>

        <div className="col-md-4 item_login_2"></div>
      </div>
    </div>
  );
};

export default Login;
