import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

function UserCard({
  name,
  role,
  teaches,
  learns,
  rating,
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-2xl font-bold text-white">
        {name.charAt(0)}
      </div>

      <h2 className="mt-4 text-2xl font-bold text-white">
        {name}
      </h2>

      <p className="text-gray-400">{role}</p>

      {/* Skills Offered */}
      <div className="mt-5">
        <h3 className="text-cyan-400 font-semibold">
          Teaches
        </h3>

        <div className="flex flex-wrap gap-2 mt-2">
          {teaches.map((skill) => (
            <span
              key={skill}
              className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm"
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
              className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6">

        <div className="flex items-center gap-2 text-yellow-400">
          <FaStar />
          {rating}
        </div>

        <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg transition">
          View Profile
        </button>

      </div>
    </motion.div>
  );
}

export default UserCard;