import { motion } from "framer-motion";
import { FaUsers, FaExchangeAlt, FaSearch } from "react-icons/fa";

const features = [
  {
    icon: <FaUsers size={35} />,
    title: "Connect",
    desc: "Meet people who can teach the skills you want to learn.",
  },
  {
    icon: <FaExchangeAlt size={35} />,
    title: "Skill Exchange",
    desc: "Teach your expertise and learn something new in return.",
  },
  {
    icon: <FaSearch size={35} />,
    title: "Smart Search",
    desc: "Find the perfect learning partner using powerful filters.",
  },
];

function Features() {
  return (
    <section className="bg-slate-950 py-24 px-6 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-4">
          Why <span className="text-cyan-400">SkillSwap?</span>
        </h2>

        <p className="text-gray-400 mb-16 text-lg">
          Learn faster by connecting with people who share your passion.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <div className="text-cyan-400 mb-6 flex justify-center">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-400">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;