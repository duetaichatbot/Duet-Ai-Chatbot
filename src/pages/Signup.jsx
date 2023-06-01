import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/userSlice";
import "../../src/index.css";
import chatbot from "../assets/chatbot3.gif";


const Signup = () => {
  
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [registerFields, setRegisterFields] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    tc: false,
  });
  const dispatch = useDispatch();

  const handleRegisterField = (e) => {
    if (e.target.name === "tc") {
      setRegisterFields({
        ...registerFields,
        [e.target.name]: e.target.checked,
      });
    } else {
      setRegisterFields({ ...registerFields, [e.target.name]: e.target.value });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setLoader(true);
    dispatch(registerUser(registerFields)).then((res) => {
      console.log(res, "this is created user response...");
      if (res.payload.status === 201) {
        setLoader(false);
        navigate("/");
      } else {
        setError(res.payload.message);
        setLoader(false);
      }
    });
  };

  return (
    <>
      <div className="signup_container">
        <div className="item_1">
          <div className="form_container">
            <div>
              <h3
                className="error_msg text-center"
                style={{ fontSize: "18px" }}
              >
                {" "}
                {error}
              </h3>
            </div>
            <div className="signup_heading">
              <span className="signup_span">Signup</span>
            </div>
            {/* form-inputs */}
            <form className="signup_form">
              <input
                className="name_input  signup_input"
                type="text"
                name="name"
                value={registerFields.name}
                onChange={handleRegisterField}
                placeholder="Enter Name"
              />
              <br />
              <input
                className="email_input signup_input"
                type="email"
                name="email"
                value={registerFields.email}
                onChange={handleRegisterField}
                placeholder="Enter Email"
              />
              <br />
              <input
                className="password_input signup_input"
                type="password"
                name="password"
                value={registerFields.password}
                onChange={handleRegisterField}
                placeholder="Enter Password"
              />
              <br />
              <input
                className="cpassword_input signup_input"
                type="password"
                name="cpassword"
                value={registerFields.cpassword}
                onChange={handleRegisterField}
                placeholder="Confirm Password"
              />
              <br />
              <br />
              <input
                className="checkbox_input"
                type="checkbox"
                name="tc"
                onChange={handleRegisterField}
              />
              <label className="checkbox_label" htmlFor="">
                Agree term & Condition
              </label>
              <br />

              <div className="signup_btn_div">
                {loader ? (
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
                    onClick={handleRegister}
                  >
                    SIGN UP
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="item_2">
          <h3>WELCOME!</h3>
          <p>Enter your details and start your journey with us</p>
          <img src={chatbot} alt="" />
        </div>
      </div>
    </>
  );
};

export default Signup;
