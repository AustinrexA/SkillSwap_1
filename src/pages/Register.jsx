import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center px-6">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full top-10 left-10"></div>
      <div className="absolute w-[450px] h-[450px] bg-purple-500/20 blur-[150px] rounded-full bottom-0 right-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <FaUserPlus className="text-cyan-400 text-5xl mx-auto mb-4" />

          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-gray-300 mt-2">
            Join SkillSwap and start learning today.
          </p>
        </div>

        <form className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <input
            type="text"
            placeholder="Skills You Can Teach"
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            placeholder="Skills You Want To Learn"
            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-semibold text-lg"
          >
            Create Account
          </motion.button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?
          <span className="text-cyan-400 cursor-pointer hover:underline ml-2">
            Sign In
          </span>
        </p>

      </motion.div>

    </div>
  );
}

export default Register;