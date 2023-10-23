import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { useEffect } from "react";
import axiosInstance from "../../axiosConfig";

const Header = () => {
  
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();
  const baseUrl = axiosInstance.defaults.baseURL;

  return (
    <>
      <nav className="navbar bg-body-tertiary bg-dark">
        <div className="container">
          <Link className="navbar-brand text-light" to="/">
            Duet Ai Chatbot
          </Link>

     <div className="d-flex gap-5">
        <span >
        <NavLink to="/feedbacks" className="text-light" style={{
          textDecoration:"none"
        }}>Feedback</NavLink>
        </span>
        <span >
        <NavLink to="/signup" className="text-light" style={{
          textDecoration:"none"
        }}>Users</NavLink>
        </span>
     </div>
          <div>

          
            {userData?.isLoggin ? (
              <>
                <span>
                  <img
                    src={`${baseUrl}/${userData?.user?.user?.avatar}`}
                    alt="userimg"
                    width="50px"
                  />
                </span>
                <span className="mx-2 text-light">
                  {userData.user.user.name}
                </span>
                <span className="mx-2">
                  <NavLink onClick={() => dispatch(logout())}
                   style={{
                    textDecoration:"none",
                    color: "#fff",
                    fontWeight:"bold"
                  }}
                  >Logout</NavLink>
                </span>
              </>
            ) : (
              <>
                <span className="mx-2">
                  <NavLink to="/signup"
                   style={{
                    textDecoration:"none",
                    color: "#fff",
                    fontWeight:"bold"
                  }}
                  >Signup</NavLink>
                </span>
                <span className="mx-2">
                  <NavLink to="/login"
                   style={{
                    textDecoration:"none",
                    color: "#fff",
                    fontWeight:"bold"
                  }}
                  >Login</NavLink>
                </span>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
