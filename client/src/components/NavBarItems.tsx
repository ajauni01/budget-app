import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBarItems = () => {
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
        <>
            {/* home */}
            <li>
                <Link
                    to="/"
                    className={`text-xl  px-5 link link-hover ${
                        theme === "light" ? "text-white" : ""
                    }`}
                >
                    Home
                </Link>
            </li>
            {/* about */}
            <li>
                <Link
                    to="/about"
                    className={`text-xl  px-5 link link-hover ${
                        theme === "light" ? "text-white" : ""
                    }`}
                >
                    About
                </Link>
            </li>
            {/* contact */}
            <li>
                <Link
                    to="/contact"
                    className={`text-xl  link link-hover ${
                        theme === "light" ? "text-white" : ""
                    }`}
                >
                    Contact
                </Link>
                </li>
                {/* news */}
                <li>
                    <Link
                        to="/news"
                        className={`text-xl px-5  link link-hover ${
                            theme === "light" ? "text-white" : ""
                        }`}
                    >
                        News
                    </Link>
                </li>
                <li>
                    {/* theme controller */}
                <input
                    onChange={handleToggle}
                    type="checkbox"
                    value="synthwave"
                    className="ml-5 toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2"
                />
                </li>
            
        </>
    );
}

export default NavBarItems;
