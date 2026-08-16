import { FaBell, FaEnvelope, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Topbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userUpdated", updateUser);

    return () => {
      window.removeEventListener("userUpdated", updateUser);
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    api
      .get(`/notifications/${user.id}`)
      .then((res) => {
        const unread = res.data.filter((n) => !n.read).length;
        setUnreadCount(unread);
      })
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <header className="flex items-center justify-between mb-10">
      {/* Left */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400 mt-2">
          Here's what's happening today.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search skills or users..."
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl pl-12 pr-5 py-3 w-72 text-white outline-none focus:border-cyan-400"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => navigate("/notifications")}
            className="w-12 h-12 rounded-xl bg-white/10 hover:bg-cyan-500 transition flex items-center justify-center"
          >
            <FaBell />
          </button>

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Messages */}
        <button className="w-12 h-12 rounded-xl bg-white/10 hover:bg-cyan-500 transition flex items-center justify-center">
          <FaEnvelope />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl">
          <div className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {user?.name || "Guest"}
            </h3>

            <p className="text-xs text-gray-400">
              SkillSwap User
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;