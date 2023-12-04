import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
  };

  return (
    <>
      <div className="top">
        <div className="topLeft">
          <i className="topIcon fa-brands fa-square-facebook"></i>
          <i className="topIcon fa-brands fa-square-twitter"></i>
          <i className="topIcon fa-brands fa-square-instagram"></i>
          <i className="topIcon fa-brands fa-square-pinterest"></i>
        </div>
        <div className="topCenter">
          <ul className="topList">
            <li className="topListItem">
              <Link to="/">HOME</Link>
            </li>
            <li className="topListItem">ABOUT</li>
            <li className="topListItem">CONTACT</li>

            {user && (
              <>
                <li className="topListItem">
                  <Link to="/write">WRITE</Link>
                </li>
                <li className="topListItem" onClick={handleLogout}>
                  LOGOUT
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="topRight">
          {user ? (
            <Link to="/settings">
              <img className="topImg" src={user.profilePic} alt="logo" />
            </Link>
          ) : (
            <ul className="topList">
              <li className="topListItem">
                <Link to="/login">LOGIN</Link>
              </li>
              <li className="topListItem">
                <Link to="/register">REGISTER</Link>
              </li>
            </ul>
          )}
          <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </>
  );
}
