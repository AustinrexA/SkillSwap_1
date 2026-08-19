import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import AdminSidebar from "../components/AdminSidebar";
import AdminChart from "../components/AdminChart";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    swapRequests: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
    messages: 0,
  });

  useEffect(() => {
    api
      .get("/admin/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

 const cards = [
  {
    title: "Total Users",
    value: stats.users,
    color: "from-dark grey-700 to-blue-800",
    icon: "👥",
  },
  {
    title: "Swap Requests",
    value: stats.swapRequests,
    color: "from-indigo-700 to-vibrant indigo-800",
    icon: "🔄",
  },
  {
    title: "Pending",
    value: stats.pending,
    color: "from-amber-800 to-gold-500",
    icon: "🟡",
  },
  {
    title: "Accepted",
    value: stats.accepted,
    color: "from-soft emerald-700 to-emerald-800",
    icon: "🟢",
  },
  {
    title: "Rejected",
    value: stats.rejected,
    color: "from-rose-700 to-light rose-800",
    icon: "🔴",
  },
  {
    title: "Messages",
    value: stats.messages,
    color: "from-blue-800 to-dark grey-700",
    icon: "💬",
  },
];
<div className="mt-10">
    <AdminChart stats={stats} />
</div>
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white flex">

  <AdminSidebar />

  <div className="flex-1 p-10">

    <h1 className="text-5xl font-bold mb-2">
      Admin Dashboard
    </h1>

    <p className="text-gray-400 mb-10">
      Monitor your SkillSwap platform
    </p>

   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

  {cards.map((card) => (
    <div
      key={card.title}
      className={`bg-gradient-to-r ${card.color} rounded-2xl p-6 shadow-xl`}
    >
      <div className="text-5xl">{card.icon}</div>

      <h2 className="mt-4 text-xl font-semibold">
        {card.title}
      </h2>

      <p className="text-4xl font-bold mt-2">
        {card.value}
      </p>
    </div>
  ))}

</div>

<div className="mt-10">
  <AdminChart stats={stats} />
</div>

  </div>

</div>
  );
}

export default AdminDashboard;