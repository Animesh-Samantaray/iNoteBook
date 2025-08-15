import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Add Note", path: "/add" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white tracking-wide"> Note</Link>

        <div className="flex space-x-8 text-white font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition hover:text-yellow-300 ${
                location.pathname === link.path? "text-yellow-300 font-bold": ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link
          to="/"
          className="bg-yellow-300 text-indigo-800 px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-400 transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
