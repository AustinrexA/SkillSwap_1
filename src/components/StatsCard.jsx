import { motion } from "framer-motion";

function StatsCard({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400">{title}</p>
          <h2 className="text-4xl font-bold mt-2 text-white">
            {value}
          </h2>
        </div>

        <div className={`text-4xl ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default StatsCard;