import { Link, NavLink } from "react-router";
import UserMenu from "./UserMenu";
import { useAppSelector } from "../../../lib/stores/store";

export default function Navbar() {
  const user = useAppSelector((state) => state.account.user);

  return (
    <header
      className="px-3 w-full fixed top-0 z-50 bg-gradient-to-r 
    from-primary to-black"
    >
      <div
        className="flex align-middle items-center px-10 mx-auto 
      gap-6 cursor-pointer"
      >
        <div
          className="max-h-16 text-white flex items-center 
        gap-3 border-r-white border-r-2 pr-6 my-4"
        >
          <NavLink to="/" className="text-2xl font-semibold text-white uppercase">
            Revents
          </NavLink>
        </div>
        <nav className="flex gap-3 my-2 uppercase text-white">
          <NavLink to="/events" end>
            Event
          </NavLink>
          <NavLink to="/createEvent">Create</NavLink>
        </nav>
        <div className="flex align-middle ml-auto gap-3">
          {user ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-info">
                Login
              </Link>
              <button className="btn btn-outline btn-info">Register</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
