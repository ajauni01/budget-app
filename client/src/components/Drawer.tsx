import { Link, Route, Routes } from "react-router-dom";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import ErrorPage from "./ErrorPage";
import HomePage from "./HomePage";
import NavBarItems from "./NavBarItems";
import { useEffect, useState } from "react";

const Drawer = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
);

const handleToggle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
};

useEffect(() => {
    localStorage.setItem("theme", theme!);
    const localTheme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", localTheme!);
}, [theme]);

  return (
    <div className="drawer">
      {/* toggle the drawer */}
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* navbar for the desktop device */}
        <div className="navbar w-full bg-zinc-500">
          <div className="flex-none md:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          {/* navbar-start */}
          <div className="navbar-start">
            {/* navbar title */}
            <Link
              to="/"
              className={`text-2xl bg-teal-500 hover:bg-teal-400 p-2 rounded ${
                theme === "dark" ? "text-white" : ""
              }`}
            >
              BudgetApp
            </Link>
          </div>
          {/* navbar-center */}
          <div className="navbar-center sm:hidden md:block">
            {/* navbar content here */}
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
        {/* page content */}
        <div className="sm:p-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        </div>
      </div>
      {/* sidebar for the mobile devices */}
      <div className="drawer-side md:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-zinc-600">
          {/* Sidebar content here */}
          <NavBarItems />
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
