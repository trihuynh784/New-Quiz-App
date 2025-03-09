import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import Logout from "../logout";

function Header() {
  const isLogin = useSelector(state => state.authReducer);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tok = getCookie("token");
    setToken(tok);
  }, [isLogin])

  return (
    <>
      <Link className="header__logo" to={isLogin ? "/" : "/login"}>
        QUIZ APP
      </Link>

      {token && isLogin ? (
        <>
          <div className="header__menu">
            <Link className="btn-log" to="/">
              Home
            </Link>
            <Link className="btn-log" to="/topics">
              Topics
            </Link>
            <Link className="btn-log" to="/answers">
              Answers
            </Link>
          </div>
          <Logout />
        </>
      ) : (
        <>
          <div className="header__auth">
            <Link className="btn-log header__login" to="/login">
              Login
            </Link>
            <Link className="btn-log header__register" to="/register">
              Register
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default Header;
