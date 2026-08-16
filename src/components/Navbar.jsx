import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userUpdated", updateUser);

    return () => {
      window.removeEventListener("userUpdated", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-5">

        {/* Logo */}
        <Link
          to={user ? "/dashboard" : "/"}
          className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          SkillSwap
        </Link>
        <Link
  to="/notifications"
  className="hover:text-cyan-400 transition"
>
  Notifications
</Link>
        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-gray-300">
          <li>
            <Link
              to="/dashboard"
              className="hover:text-cyan-400 transition"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/browse"
              className="hover:text-cyan-400 transition"
            >
              Browse
            </Link>
          </li>

          <li>
            <Link
              to="/requests"
              className="hover:text-cyan-400 transition"
            >
              Requests
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              className="hover:text-cyan-400 transition"
            >
              Profile
            </Link>
          </li>
        </ul>

        {/* User Section */}
        <div className="flex items-center gap-4">

          {user && (
            <>
              <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-white">
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <span className="text-white font-semibold">
                {user.name}
              </span>
            </>
          )}

          {!user ? (
            <Link to="/login">
              <button className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-full text-white transition">
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-full text-white transition"
            >
              Logout
            </button>
          )}

        </div>

      </div>
    </motion.nav>
  );
}

export default Navbar;