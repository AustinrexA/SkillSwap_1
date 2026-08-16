import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BrowseUserCard from "../components/BrowseUserCard";
import api from "../api/api";

function Browse() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
  api
    .get("/users")
    .then((response) => {
      setUsers(response.data);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}, []);
const [search, setSearch] = useState("");
const filteredUsers = users.filter((user) => {
  const keyword = search.toLowerCase();

  return (
    user.name.toLowerCase().includes(keyword) ||
    user.skillsOffered.toLowerCase().includes(keyword) ||
    user.skillsWanted.toLowerCase().includes(keyword)
  );
});
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto pt-32 px-6">

        {/* Heading */}
        <h1 className="text-5xl font-bold">
          Browse Skills
        </h1>

        <p className="text-gray-400 mt-3">
          Find people who can teach you and share your own skills.
        </p>

        {/* Search */}
        <input
  type="text"
  placeholder="Search by name or skill..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full mt-8 bg-white/10 border border-white/10 rounded-xl p-4 outline-none focus:border-cyan-400"
/>

        {/* Skill Filters */}
       <div className="flex flex-wrap gap-3 mt-6">
  {["Java", "React", "Spring Boot", "Python", "UI/UX"].map((skill) => (
    <button
      key={skill}
      onClick={() => setSearch(skill)}
      className="px-5 py-2 rounded-full bg-white/10 hover:bg-cyan-500 transition"
    >
      {skill}
    </button>
  ))}
</div>

        {/* Users */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">

          {filteredUsers.map((user) => (
  <BrowseUserCard
  key={user.id}
  id={user.id}
  name={user.name}
  role="SkillSwap User"
  teaches={user.skillsOffered.split(",")}
  learns={user.skillsWanted.split(",")}
  rating="5.0"
/>
))}

        </div>

      </div>

    </div>
  );
}

export default Browse;