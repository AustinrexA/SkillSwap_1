import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../api/api";

function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const loadUsers = () => {
    api.get("/admin/users")
      .then((res) => setUsers(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await api.delete(`/admin/users/${id}`);

    loadUsers();
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">

      <AdminSidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-6">
          User Management
        </h1>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="mb-6 w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
        />

        <div className="overflow-x-auto rounded-2xl bg-white/10">

          <table className="w-full">

            <thead>

              <tr className="bg-cyan-600">

                <th className="p-4">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Offered</th>
                <th>Wanted</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user)=>(
                <tr
                  key={user.id}
                  className="border-b border-white/10 text-center"
                >

                  <td className="p-4">{user.id}</td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.skillsOffered}</td>

                  <td>{user.skillsWanted}</td>

                  <td>

                    <button
                      onClick={()=>deleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminUsers;