import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  // get the theme from local storage or set it to light if the current theme is dark
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  // toggle the theme
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  //  set the theme to the local storage
  useEffect(() => {
    // set the initial theme to the local storage
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <div className="navbar bg-neutral w-full">
      {/* navbar starts */}
      <div className="navbar-start">
        <Link
          to="/"
          className={`text-3xl bg-teal-500 hover:bg-teal-400 p-2 rounded ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          BudgetApp
        </Link>
      </div>

      <div className="navbar-center ">
        <Link
          to="/"
          className={`text-xl  px-5 link link-hover ${
            theme === "light" ? "text-white" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`text-xl  px-5 link link-hover ${
            theme === "light" ? "text-white" : ""
          }`}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={`text-xl  link link-hover ${
            theme === "light" ? "text-white" : ""
          }`}
        >
          Contact
        </Link>
        {/* theme controller */}
        <input
          onChange={handleToggle}
          type="checkbox"
          value="synthwave"
          className="ml-5 toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2"
        />
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
