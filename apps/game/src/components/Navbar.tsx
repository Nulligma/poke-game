import { Link, NavLink } from "react-router-dom";
import pokeballIcon from "../assets/pokeball-icon.png";
import { useAppSelector } from "../app/hooks";
const navigationRoutes = [
  {
    name: "Battle",
    route: "/battle",
  },
  {
    name: "Shop",
    route: "/shop",
  },
  {
    name: "Gym",
    route: "/gym",
  },
  {
    name: "Pokemon",
    route: "/pokemon",
  },
  {
    name: "About",
    route: "/about",
  },
];

const unAuthRoutes = [
  {
    name: "Login",
    route: "/login",
  },
  {
    name: "Pokemon",
    route: "/pokemon",
  },
  {
    name: "About",
    route: "/about",
  },
];

export default function Navbar() {
  const { token } = useAppSelector((store) => store.user);

  const routes = token ? navigationRoutes : unAuthRoutes;

  return (
    <nav>
      <div className="block">
        <img src={pokeballIcon} alt="" />
      </div>
      <div className="data">
        <ul>
          {routes.map(({ name, route }, index) => {
            return (
              <NavLink
                to={route}
                key={index}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <li>{name}</li>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
