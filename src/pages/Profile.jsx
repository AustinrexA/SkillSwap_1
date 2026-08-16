import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaStar, FaHandshake } from "react-icons/fa";
import api from "../api/api";

function Profile() {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [editing, setEditing] = useState(false);

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    skillsOffered: "",
    skillsWanted: "",
  });

  useEffect(() => {
    if (loggedUser) {
      api
        .get(`/users/${loggedUser.id}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/users/${user.id}`, user);

      setUser(response.data);

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      // Notify Navbar, Sidebar and Topbar
      window.dispatchEvent(new Event("userUpdated"));

      setEditing(false);

      alert("Profile Updated Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto pt-32 px-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-8">

            <div className="w-32 h-32 rounded-full bg-cyan-500 flex items-center justify-center text-5xl font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            <div className="flex-1">

              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="text-4xl font-bold bg-transparent border-b border-cyan-400 outline-none w-full"
                />
              ) : (
                <h1 className="text-4xl font-bold">
                  {user.name}
                </h1>
              )}

              <p className="text-cyan-400 mt-2">
                SkillSwap User
              </p>

              <p className="text-gray-300 mt-2">
                {user.email}
              </p>

              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="mt-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl"
                >
                  Save Changes
                </button>
              )}

            </div>

          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <FaStar className="mx-auto text-yellow-400 text-3xl" />
              <h2 className="text-3xl font-bold mt-3">5.0</h2>
              <p className="text-gray-400">Rating</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <FaHandshake className="mx-auto text-cyan-400 text-3xl" />
              <h2 className="text-3xl font-bold mt-3">0</h2>
              <p className="text-gray-400">Completed Swaps</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <h2 className="text-3xl font-bold text-green-400">
                {user.skillsOffered
                  ? user.skillsOffered.split(",").length
                  : 0}
              </h2>
              <p className="text-gray-400">Skills</p>
            </div>

          </div>

          {/* Skills */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">

            {/* Skills Offered */}
            <div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                Skills I Teach
              </h2>

              {editing ? (
                <textarea
                  name="skillsOffered"
                  value={user.skillsOffered}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-slate-800 rounded-xl p-4"
                />
              ) : (
                <div className="flex flex-wrap gap-3">
                  {user.skillsOffered &&
                    user.skillsOffered.split(",").map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Skills Wanted */}
            <div>
              <h2 className="text-2xl font-bold text-pink-400 mb-4">
                Skills I Want to Learn
              </h2>

              {editing ? (
                <textarea
                  name="skillsWanted"
                  value={user.skillsWanted}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-slate-800 rounded-xl p-4"
                />
              ) : (
                <div className="flex flex-wrap gap-3">
                  {user.skillsWanted &&
                    user.skillsWanted.split(",").map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full bg-pink-500/20 text-pink-300"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;