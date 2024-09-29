import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";
import clsx from "clsx";

function Navigation() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(style.link, isActive && style.activeLink);
  };

  return (
    <header className={style.header}>
      <p className={style.logo}>FilmQuest</p>
      <nav className={style.navigation}>
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