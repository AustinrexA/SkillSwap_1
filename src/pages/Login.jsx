import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

const [loginData, setLoginData] = useState({
  email: "",
  password: "",
});

const handleChange = (e) => {
  setLoginData({
    ...loginData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/users/login", loginData);

    if (response.data) {
      // Save logged-in user
      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Login Successful!");

      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  } catch (error) {
    console.error(error);
    alert("Login Failed");
  }
};

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center px-6 py-20 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] bottom-10 right-10"></div>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold text-white leading-tight">
            Welcome
            <br />
            <span className="text-cyan-400">Back!</span>
          </h1>

          <p className="mt-6 text-xl text-gray-300 leading-8 max-w-lg">
            Continue your learning journey. Discover new mentors,
            exchange knowledge, and grow your skills with SkillSwap.
          </p>

          <div className="mt-10 space-y-4">

            <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/10">
              <h3 className="text-cyan-400 font-semibold text-lg">
                🚀 Learn Faster
              </h3>
              <p className="text-gray-300 mt-2">
                Connect with experienced learners and mentors.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/10">
              <h3 className="text-pink-400 font-semibold text-lg">
                🤝 Skill Exchange
              </h3>
              <p className="text-gray-300 mt-2">
                Teach what you know and learn what you love.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
        >
          <h2 className="text-4xl font-bold text-white">
            Login
          </h2>

          <p className="text-gray-300 mt-2 mb-8">
            Sign in to your SkillSwap account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-5 text-cyan-400" />

              <input
  type="email"
  name="email"
  value={loginData.email}
  onChange={handleChange}
  placeholder="Email Address"
  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
/>
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-5 text-cyan-400" />

              <input
  type={showPassword ? "text" : "password"}
  name="password"
  value={loginData.password}
  onChange={handleChange}
  placeholder="Password"
  className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
/>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-5 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Remember Me */}
            <div className="flex justify-between items-center text-sm">
              <label className="text-gray-300 flex items-center gap-2">
                <input type="checkbox" />
                Remember Me
              </label>

             <button
  type="button"
  onClick={() => navigate("/forgot-password")}
  className="text-cyan-400 hover:underline"
>
  Forgot Password?
</button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition font-semibold text-lg"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
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
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-cyan-400 hover:underline"
              >
                Register
              </Link>
            </p>

          </form>
        </motion.div>

      </div>
    </section>
  );
}

export default Login;