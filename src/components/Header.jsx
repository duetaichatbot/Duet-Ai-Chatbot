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
                  <NavLink onClick={() => dispatch(logout())}>Logout</NavLink>
                </span>
              </>
            ) : (
              <>
                <span className="mx-2">
                  <NavLink to="/signup">Signup</NavLink>
                </span>
                <span className="mx-2">
                  <NavLink to="/login">Login</NavLink>
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
