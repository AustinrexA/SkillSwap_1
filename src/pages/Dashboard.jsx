import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import UserCard from "../components/UserCard";
import Topbar from "../components/Topbar";
import RecentActivity from "../components/RecentActivity";
import UpcomingSessions from "../components/UpcomingSessions";
import TrendingSkills from "../components/TrendingSkills";
import { useNavigate } from "react-router-dom";

import {
  FaBook,
  FaHandshake,
  FaClock,
  FaStar,
} from "react-icons/fa";


function Dashboard() {
const navigate = useNavigate();
  
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">

      <Sidebar />

      <main className="ml-72 p-10 text-white">

        {/* Header */}
        <Topbar />

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

          <StatsCard
            title="My Skills"
            value="12"
            icon={<FaBook />}
            color="text-cyan-400"
          />

          <StatsCard
            title="Active Swaps"
            value="5"
            icon={<FaHandshake />}
            color="text-pink-400"
          />

          <StatsCard
            title="Pending Requests"
            value="3"
            icon={<FaClock />}
            color="text-yellow-400"
          />

          <StatsCard
            title="Rating"
            value="4.9"
            icon={<FaStar />}
            color="text-green-400"
          />

        </div>

        {/* Recommended Users */}
        <section className="mt-16">

          <h2 className="text-3xl font-bold mb-6">
            Recommended Learners
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            <UserCard
              name="Sarah"
              role="UI/UX Designer"
              teaches={["Figma", "UI Design"]}
              learns={["Java"]}
              rating="4.8"
            />

            <UserCard
              name="John"
              role="React Developer"
              teaches={["React", "JavaScript"]}
              learns={["Spring Boot"]}
              rating="4.9"
            />

            <UserCard
              name="Emma"
              role="Python Developer"
              teaches={["Python", "Django"]}
              learns={["React"]}
              rating="4.7"
            />

          </div>

        </section>
        <div className="grid lg:grid-cols-2 gap-8 mt-16">
  <RecentActivity />
  <UpcomingSessions />
</div>
<div className="grid lg:grid-cols-2 gap-8 mt-10">
  <TrendingSkills />
</div>

      </main>

    </div>
  ); 
}

export default Dashboard;