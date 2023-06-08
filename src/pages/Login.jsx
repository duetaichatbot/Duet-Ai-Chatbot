import React from 'react'
import "../../src/index.css";
import chatbot from "../assets/chatbot6.gif";

const Login = () => {
  return (
    <div className='login_container container-fluid'>

      <div className='row login_main_row'>
        <div className='col-md-8 item_login_1'>

        <h3>WELCOME!</h3>
          <p>Enter your details and start your journey with us</p>
          <img src={chatbot} alt=""/>



          <div className='login_form_container'>

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
              />
              <br />
              <input
                className="password_input signup_input"
                type="password"
                name="password"

                placeholder="Enter Password"
              />
              <span>No account? <a class="createOne" href="">Create one!</a></span>

              <div className='login_btn_div mt-3'>
                <button
                  className="btn btn-primary login_btn"
                  type="button"
                >
                  LOGIN
                </button>
              </div>
            </form>
            {/*  */}
          </div>

        </div>

        <div className='col-md-4 item_login_2'>
        
        </div>
      </div>

    </div>
  )
}

export default Login
