import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  if(links.length == 1) {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
    <Link to="/Kambaz/Account/Profile" id="wd-profile-link"
      className="list-group-item text-danger border border-0">Profile</Link>
  </div>
);
  }
  else {
    return (
      <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link to="/Kambaz/Account/Signin" id="wd-signin-link"
        className="list-group-item active border border-0">Sign in</Link>
      <Link to="/Kambaz/Account/Signup" id="wd-signup-link"
        className="list-group-item text-danger border border-0">Sign up</Link>
    </div>
  );
    }
}

