import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar bg-neutral w-full">
      {/* navbar starts */}
      <div className="navbar-start">
        <Link
          to="/"
          className="text-3xl bg-teal-500 hover:bg-teal-400 text-white p-2 rounded"
        >
          BudgetApp
        </Link>
      </div>

      <div className="navbar-center text-white">
        <Link to="/" className="text-xl text-white px-5 link link-hover">
          Home
        </Link>
        <Link to="/about" className="text-xl text-white px-5 link link-hover">
          About
        </Link>
        <Link to="/contact" className="text-xl text-white link link-hover">
          Contact
        </Link>
      </div>

      {/* navbar ends */}
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Profile Image"
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
