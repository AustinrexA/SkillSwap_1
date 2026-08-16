import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaUserPlus,
  FaStar,
  FaHandshake,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaHandshake className="text-cyan-400" />,
    title: "John accepted your swap request",
    time: "5 minutes ago",
  },
  {
    icon: <FaStar className="text-yellow-400" />,
    title: "Emma rated your Java session 5★",
    time: "30 minutes ago",
  },
  {
    icon: <FaUserPlus className="text-green-400" />,
    title: "Sarah joined SkillSwap",
    time: "1 hour ago",
  },
  {
    icon: <FaCheckCircle className="text-pink-400" />,
    title: "You completed a React learning session",
    time: "Yesterday",
  },
];

function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-none"
          >
            <div className="text-2xl">
              {activity.icon}
            </div>

            <div>
              <p className="text-white">
                {activity.title}
              </p>

              <span className="text-gray-400 text-sm">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default RecentActivity;