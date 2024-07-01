import "./navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav className="navigation">
        <NavLink to="/" className="navigation__link">
          Preview
        </NavLink>
      </nav>
    </>
  );
};

export default Navigation;
