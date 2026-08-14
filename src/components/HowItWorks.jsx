import { motion } from "framer-motion";
import { FaUserPlus, FaSearch, FaHandshake } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus size={40} />,
    title: "Create Your Profile",
    description:
      "Sign up and tell SkillSwap what you can teach and what you want to learn.",
  },
  {
    icon: <FaSearch size={40} />,
    title: "Find Your Match",
    description:
      "Search for learners and mentors based on skills, interests, and categories.",
  },
  {
    icon: <FaHandshake size={40} />,
    title: "Start Learning",
    description:
      "Send a SkillSwap request, connect with people, and begin learning together.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-[#050816] py-24 px-6 text-white">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold">
            How <span className="text-cyan-400">SkillSwap</span> Works
          </h2>

          <p className="text-gray-400 mt-5 text-lg">
            Start learning in three simple steps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 mt-20">

          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <div className="w-20 h-20 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-8">
                {step.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {step.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {step.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;