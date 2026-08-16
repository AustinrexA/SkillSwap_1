import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaCode,
  FaGraduationCap,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  skillsOffered: "",
  skillsWanted: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    await api.post("/users", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      skillsOffered: formData.skillsOffered,
      skillsWanted: formData.skillsWanted,
    });

    alert("Registration Successful!");

    navigate("/login");
  } catch (error) {
    console.error(error);
    alert("Registration Failed");
  }
};
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center px-6 py-20 overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full bottom-10 right-10"></div>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold text-white leading-tight">
            Join <span className="text-cyan-400">SkillSwap</span>
          </h1>

          <p className="mt-6 text-xl text-gray-300 leading-8">
            Learn new skills from people around the world and share your own
            knowledge through an amazing community.
          </p>

          <div className="mt-12 space-y-6">

            <div className="flex items-center gap-4">
              <div className="bg-cyan-500 p-4 rounded-full">
                <FaCode className="text-white text-xl" />
              </div>

              <div>
                <h3 className="text-white font-semibold text-xl">
                  Teach Your Skills
                </h3>

                <p className="text-gray-400">
                  Help others while building your profile.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-pink-500 p-4 rounded-full">
                <FaGraduationCap className="text-white text-xl" />
              </div>

              <div>
                <h3 className="text-white font-semibold text-xl">
                  Learn Faster
                </h3>

                <p className="text-gray-400">
                  Connect with mentors and passionate learners.
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
        >
          <h2 className="text-4xl font-bold text-white mb-2">
            Create Account
          </h2>

          <p className="text-gray-300 mb-8">
            Start your SkillSwap journey today.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-cyan-400" />

              <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Full Name"
  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
/>
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-cyan-400" />

              <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Email Address"
  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
/>
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-cyan-400" />

              <input
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Password"
  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
/>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-cyan-400" />

              <input
  type="password"
  name="confirmPassword"
  value={formData.confirmPassword}
  onChange={handleChange}
  placeholder="Confirm Password"
  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
/>
            </div>

            {/* Skills */}
            <input
  type="text"
  name="skillsOffered"
  value={formData.skillsOffered}
  onChange={handleChange}
  placeholder="Skills You Can Teach (Java, React...)"
  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
/>

           <input
  type="text"
  name="skillsWanted"
  value={formData.skillsWanted}
  onChange={handleChange}
  placeholder="Skills You Want to Learn"
  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
/>

            {/* Level */}
            <select className="w-full px-5 py-4 rounded-xl bg-slate-800 border border-white/10 text-white outline-none focus:border-cyan-400">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            {/* Register */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition font-semibold text-lg"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-600"></div>
              <span className="text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full py-4 rounded-xl border border-white/20 text-white hover:bg-white/10 transition flex justify-center items-center gap-3"
            >
              <FaGoogle />
              Continue with Google
            </button>

            <p className="text-center text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-400 hover:underline"
              >
                Login
              </Link>
            </p>

          </form>
        </motion.div>

      </div>
    </section>
  );
}

export default Register;