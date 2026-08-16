import { motion } from "framer-motion";

const sessions = [
  {
    title: "React Basics",
    mentor: "John",
    time: "Today • 6:00 PM",
  },
  {
    title: "Java Interview Prep",
    mentor: "Sarah",
    time: "Tomorrow • 7:30 PM",
  },
  {
    title: "Spring Boot API",
    mentor: "Emma",
    time: "Saturday • 10:00 AM",
  },
];

function UpcomingSessions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        Upcoming Sessions
      </h2>

      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition"
          >
            <h3 className="text-lg font-semibold text-white">
              {session.title}
            </h3>

            <p className="text-cyan-400 mt-1">
              Mentor: {session.mentor}
            </p>

            <p className="text-gray-400 text-sm mt-2">
              {session.time}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default UpcomingSessions;