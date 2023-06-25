import React, { useState } from "react";

const Form = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
  });

  const [box, setBox] = useState(false);

  const handleFormInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setBox(!box);
    setValidationErrors({});
    console.log(inputs, "form data");

    const res = {
      message: "The email has already been taken. (and 1 more error)",
      errors: {
        email: ["The email has already been taken."],
        password: ["The password and confirm password must match."],
      },
    };
    setValidationErrors(res);
    console.log(validationErrors?.errors?.email[0], "email error");
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleFormInputs}
        />
        <small
          className={`error-message ${
            validationErrors?.errors?.name ? "show" : ""
          }`}
        >
          {validationErrors?.errors?.name?.[0]}
        </small>
        <br />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleFormInputs}
        />
        <small
          className={`error-message ${
            validationErrors?.errors?.email ? "show" : ""
          }`}
        >
          {validationErrors?.errors?.email?.[0]}
        </small>
        <br />
        <input
          type="phone"
          name="phone"
          placeholder="phone"
          onChange={handleFormInputs}
        />
        <small></small>
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleFormInputs}
        />
        <small
          className={`error-message ${
            validationErrors?.errors?.password ? "show" : ""
          }`}
        >
          {validationErrors?.errors?.password?.[0]}
        </small>
        <br />
        <label htmlFor="gender1">Male</label>
        <input
          type="radio"
          name="gender"
          id="gender1"
          value="M"
          placeholder="name"
          onChange={handleFormInputs}
        />
        <label htmlFor="gender2">Female</label>
        <input
          type="radio"
          name="gender"
          id="gender2"
          value="F"
          placeholder="name"
          onChange={handleFormInputs}
        />
        <br />
        <button onClick={handleRegister}>Submit</button>
      </form>

  <div className={`text-box ${box ? "text-box-show" : ""}`}>
    <h1>Text Box Here</h1>
    <button onClick={()=>setBox(false)}>X</button>
  </div>

      {/* <h2>hgjhgjhgjhg</h2> */}
    </div>
  );
};

export default Form;
