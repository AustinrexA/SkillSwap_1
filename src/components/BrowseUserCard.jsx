import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api/api";

function BrowseUserCard({
  id,
  name,
  role,
  teaches,
  learns,
  rating,
}) {

  const handleRequestSwap = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) {
      alert("Please login first.");
      return;
    }

    if (loggedInUser.id === id) {
      alert("You cannot send a request to yourself.");
      return;
    }

    const swapRequest = {
      senderId: loggedInUser.id,
      receiverId: id,
      offeredSkill: loggedInUser.skillsOffered,
      requestedSkill: teaches.join(", "),
    };

    try {
      await api.post("/swap", swapRequest);
      alert("Swap Request Sent Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to send request.");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg"
    >
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-2xl font-bold">
        {name.charAt(0)}
      </div>

      {/* User Info */}
      <h2 className="text-2xl font-bold mt-4">
        {name}
      </h2>

      <p className="text-gray-400">
        {role}
      </p>

      {/* Skills Offered */}
      <div className="mt-5">
        <h3 className="text-cyan-400 font-semibold">
          Teaches
        </h3>

        <div className="flex flex-wrap gap-2 mt-2">
          {teaches.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Skills Wanted */}
      <div className="mt-5">
        <h3 className="text-pink-400 font-semibold">
          Wants to Learn
        </h3>

        <div className="flex flex-wrap gap-2 mt-2">
          {learns.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2 text-yellow-400">
          <FaStar />
          <span>{rating}</span>
        </div>

        <div className="flex gap-3">
          <Link
            to="/profile"
            className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white transition"
          >
            View
          </Link>

          <button
            onClick={handleRequestSwap}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition"
          >
            Request Swap
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default BrowseUserCard;