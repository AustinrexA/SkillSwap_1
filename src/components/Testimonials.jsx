import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "SkillSwap helped me learn Spring Boot while teaching UI Design. The experience was amazing!",
  },
  {
    name: "David Lee",
    role: "Java Developer",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "I found a React mentor within a week. The platform is simple, fast and really useful.",
  },
  {
    name: "Emma Wilson",
    role: "Data Analyst",
    image: "https://i.pravatar.cc/150?img=47",
    review:
      "The matching system is fantastic. I exchanged Python lessons for SQL coaching.",
  },
];

function Testimonials() {
  return (
    <section className="bg-[#050816] py-24 px-6 text-white">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold">
            What Our <span className="text-cyan-400">Users Say</span>
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Thousands of learners are already growing together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((user, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
                />

                <div>
                  <h3 className="text-xl font-semibold">
                    {user.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {user.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 text-yellow-400 mt-5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p className="mt-5 text-gray-300 leading-7">
                "{user.review}"
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;