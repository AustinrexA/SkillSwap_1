import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../api/api";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  const loadMessages = () => {
    api
      .get("/admin/messages")
      .then((res) => setMessages(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await api.delete(`/admin/messages/${id}`);
      loadMessages();
    } catch (err) {
      console.error(err);
      alert("Failed to delete message.");
    }
  };

  const filteredMessages = messages.filter((msg) =>
    (msg.message || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <AdminSidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-2">
          Messages
        </h1>

        <p className="text-slate-400 mb-8">
          Manage chat messages across the platform.
        </p>

        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 p-3 rounded-xl bg-slate-900 border border-slate-700 outline-none focus:border-cyan-500"
        />

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">

          <table className="w-full">

            <thead>
              <tr className="bg-slate-800 border-b border-slate-700">
                <th className="p-4">ID</th>
                <th className="p-4">Sender</th>
                <th className="p-4">Receiver</th>
                <th className="p-4">Message</th>
                <th className="p-4">Time</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-slate-400">
                    No messages found.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                  >
                    <td className="p-4 text-center">{msg.id}</td>
                    <td className="text-center">{msg.senderId}</td>
                    <td className="text-center">{msg.receiverId}</td>
                    <td className="px-4 py-3">{msg.message}</td>
                    <td className="text-center">{msg.time}</td>
                    <td className="text-center">
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-lg transition"
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

export default AdminMessages;