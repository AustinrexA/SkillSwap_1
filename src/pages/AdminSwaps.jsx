import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../api/api";

function AdminSwaps() {
  const [swaps, setSwaps] = useState([]);
  const [search, setSearch] = useState("");

  const loadSwaps = () => {
    api
      .get("/admin/swaps")
      .then((res) => setSwaps(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    loadSwaps();
  }, []);

  const deleteSwap = async (id) => {
    if (!window.confirm("Delete this swap request?")) return;

    try {
      await api.delete(`/admin/swaps/${id}`);
      loadSwaps();
    } catch (err) {
      console.error(err);
      alert("Failed to delete swap request.");
    }
  };

  const filteredSwaps = swaps.filter((swap) =>
    `${swap.senderId} ${swap.receiverId} ${swap.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const statusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-500/20 text-amber-400";
      case "ACCEPTED":
        return "bg-emerald-500/20 text-emerald-400";
      case "REJECTED":
        return "bg-rose-500/20 text-rose-400";
      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <AdminSidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-2">
          Swap Requests
        </h1>

        <p className="text-slate-400 mb-8">
          View and manage all skill swap requests.
        </p>

        <input
          type="text"
          placeholder="Search by Sender ID, Receiver ID or Status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 p-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-500 outline-none"
        />

        <div className="overflow-x-auto rounded-2xl bg-slate-900/60 border border-slate-800">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-700 bg-slate-800">
                <th className="p-4">ID</th>
                <th className="p-4">Sender</th>
                <th className="p-4">Receiver</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredSwaps.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-8 text-slate-400"
                  >
                    No swap requests found.
                  </td>
                </tr>
              ) : (
                filteredSwaps.map((swap) => (
                  <tr
                    key={swap.id}
                    className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                  >
                    <td className="p-4 text-center">{swap.id}</td>

                    <td className="text-center">
                      {swap.senderId}
                    </td>

                    <td className="text-center">
                      {swap.receiverId}
                    </td>

                    <td className="text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                          swap.status
                        )}`}
                      >
                        {swap.status}
                      </span>
                    </td>

                    <td className="text-center">
                      <button
                        onClick={() => deleteSwap(swap.id)}
                        className="bg-rose-600 hover:bg-rose-700 transition px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default AdminSwaps;