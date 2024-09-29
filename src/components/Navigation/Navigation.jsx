import { NavLink } from "react-router-dom";

import clsx from "clsx";

function Navigation() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(style.link, isActive && style.activeLink);
  };

  return (
    <header >
      <p >FilmQuest</p>
      <nav>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/movies">
          Movies
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigation;