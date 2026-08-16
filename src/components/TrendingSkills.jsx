import { motion } from "framer-motion";

const skills = [
  { name: "React", learners: 1250 },
  { name: "Spring Boot", learners: 980 },
  { name: "Java", learners: 1450 },
  { name: "UI/UX", learners: 760 },
  { name: "Python", learners: 1700 },
];

function TrendingSkills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        🔥 Trending Skills
      </h2>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex justify-between items-center bg-white/5 p-4 rounded-xl hover:bg-white/10 transition"
          >
            <span className="font-semibold text-white">
              {skill.name}
            </span>

            <span className="text-cyan-400">
              {skill.learners} learners
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default TrendingSkills;