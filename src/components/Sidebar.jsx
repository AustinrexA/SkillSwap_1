import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaUser,
  FaBook,
  FaHandshake,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  console.log(JSON.parse(localStorage.getItem("user")));
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
    <aside className="fixed left-0 top-0 w-72 h-screen bg-slate-900/90 backdrop-blur-xl border-r border-white/10 text-white">

      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-3xl font-bold text-cyan-400">
          SkillSwap
        </h1>
      </div>

      {/* User */}
      <div className="flex flex-col items-center py-8">
        <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-3xl font-bold">
          {user?.name
            ? user.name.charAt(0).toUpperCase()
            : "U"}
        </div>

        <h2 className="mt-4 text-xl font-semibold">
          {user?.name || "Guest"}
        </h2>

        <p className="text-gray-400 text-sm">
          SkillSwap User
        </p>
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-2">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-cyan-500 text-white"
                : "hover:bg-cyan-500"
            }`
          }
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/browse"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-cyan-500 text-white"
                : "hover:bg-cyan-500"
            }`
          }
        >
          <FaBook />
          Browse Skills
        </NavLink>

        <NavLink
          to="/requests"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-cyan-500 text-white"
                : "hover:bg-cyan-500"
            }`
          }
        >
          <FaHandshake />
          Swap Requests
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-cyan-500 text-white"
                : "hover:bg-cyan-500"
            }`
          }
        >
          <FaUser />
          My Profile
        </NavLink>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition">
          <FaBell />
          Notifications
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition">
          <FaCog />
          Settings
        </button>

      </nav>

      {/* Logout */}
      <div className="absolute bottom-6 w-full px-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 py-3 rounded-xl transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;