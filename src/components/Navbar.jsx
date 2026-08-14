import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-5">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          SkillSwap
        </h1>

        <ul className="hidden md:flex gap-10 text-gray-300">
          <li className="hover:text-cyan-400 cursor-pointer transition">Home</li>
          <li className="hover:text-cyan-400 cursor-pointer transition">Browse</li>
          <li className="hover:text-cyan-400 cursor-pointer transition">Community</li>
          <li className="hover:text-cyan-400 cursor-pointer transition">About</li>
        </ul>

        <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-cyan-500 hover:bg-cyan-600 transition">
          <FaUserCircle />
          Login
        </button>

      </div>
    </motion.nav>
  );
}

export default Navbar;