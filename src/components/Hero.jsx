import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import {
  FaUsers,
  FaHandshake,
  FaChartLine,
  FaCode,
} from "react-icons/fa";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white flex items-center px-6">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] top-10 left-20 animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] bottom-0 right-10 animate-pulse"></div>

      {/* Floating Skills */}
      <motion.div
        animate={{ y: [100, 20, 100] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-32 left-20 bg-cyan-500/20 backdrop-blur-lg px-5 py-2 rounded-full border border-cyan-400/30"
      >
        Java
      </motion.div>

      <motion.div
        animate={{ y: [100, -10, 100] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-60 left-100 bg-pink-500/20 backdrop-blur-lg px-5 py-2 rounded-full border border-pink-400/30"
      >
        React
      </motion.div>

      <motion.div
        animate={{ y: [100, 50, 100] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-28 left-36 bg-purple-500/20 backdrop-blur-lg px-5 py-2 rounded-full border border-purple-400/30"
      >
        Spring Boot
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl lg:text-7xl font-extrabold leading-tight"
          >
            Learn.
            <br />
            Teach.
            <br />
            <span className="text-cyan-400">Connect.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-xl text-gray-300 leading-8 max-w-xl"
          >
            Exchange knowledge instead of paying for expensive courses.
            Discover mentors, share your expertise, and grow together.
          </motion.p>

          <div className="flex gap-5 mt-10">

            <Link to="/register">
  <motion.button
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-full font-semibold flex items-center gap-3"
  >
    Get Started
    <FaArrowRight />
  </motion.button>
</Link>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 rounded-full font-semibold"
            >
              Browse Skills
            </motion.button>

          </div>

        </div>

        {/* Right Dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ y: -8 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              SkillSwap Dashboard
            </h2>

            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
              Live
            </span>
          </div>

          <div className="space-y-5">

            <div className="flex justify-between items-center bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <FaUsers className="text-cyan-400 text-xl" />
                <span>Active Learners</span>
              </div>

              <span className="font-bold text-cyan-400">
                10,542
              </span>
            </div>

            <div className="flex justify-between items-center bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <FaHandshake className="text-pink-400 text-xl" />
                <span>Skill Swaps</span>
              </div>

              <span className="font-bold text-pink-400">
                2,418
              </span>
            </div>

            <div className="flex justify-between items-center bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <FaChartLine className="text-green-400 text-xl" />
                <span>Success Rate</span>
              </div>

              <span className="font-bold text-green-400">
                96%
              </span>
            </div>

          </div>

          <div className="mt-10">

            <h3 className="font-semibold mb-4 text-cyan-400">
              Trending Skills
            </h3>

            <div className="space-y-4">

              <div>
                <div className="flex justify-between mb-1">
                  <span>Java</span>
                  <span>90%</span>
                </div>

                <div className="h-2 rounded-full bg-gray-700">
                  <div className="w-[90%] h-2 bg-cyan-400 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>React</span>
                  <span>80%</span>
                </div>

                <div className="h-2 rounded-full bg-gray-700">
                  <div className="w-[80%] h-2 bg-pink-400 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Spring Boot</span>
                  <span>75%</span>
                </div>

                <div className="h-2 rounded-full bg-gray-700">
                  <div className="w-[75%] h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;