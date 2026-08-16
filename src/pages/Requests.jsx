import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";

function Requests() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    api
      .get(`/swap/received/${user.id}`)
      .then((res) => setReceivedRequests(res.data))
      .catch((err) => console.error(err));

    api
      .get(`/swap/sent/${user.id}`)
      .then((res) => setSentRequests(res.data))
      .catch((err) => console.error(err));

    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  const acceptRequest = async (id) => {
    await api.put(`/swap/accept/${id}`);
    fetchRequests();
    
  };

  const rejectRequest = async (id) => {
    await api.put(`/swap/reject/${id}`);
    fetchRequests();
  };

  const getUserName = (id) => {
    const foundUser = users.find((u) => u.id === id);
    return foundUser ? foundUser.name : "Unknown User";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-500/20 text-green-400";

      case "REJECTED":
        return "bg-red-500/20 text-red-400";

      default:
        return "bg-yellow-500/20 text-yellow-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto pt-32 px-6">

        <h1 className="text-5xl font-bold mb-10">
          My Requests
        </h1>

        {/* Received Requests */}
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">
          Received Requests
        </h2>

        <div className="space-y-6">
          {receivedRequests.length === 0 ? (
            <p className="text-gray-400">No received requests.</p>
          ) : (
            receivedRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg hover:scale-[1.02] transition"
              >
                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center text-xl font-bold">
                      {getUserName(request.senderId).charAt(0)}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">
                        {getUserName(request.senderId)}
                      </h3>

                      <p className="text-gray-400">
                        SkillSwap User
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>

                </div>

                <div className="mt-6">
                  <p className="text-cyan-400 font-semibold">
                    Offers
                  </p>

                  <span className="inline-block mt-2 px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300">
                    {request.offeredSkill}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-pink-400 font-semibold">
                    Wants
                  </p>

                  <span className="inline-block mt-2 px-4 py-2 rounded-full bg-pink-500/20 text-pink-300">
                    {request.requestedSkill}
                  </span>
                </div>

                {request.status === "PENDING" && (
                  <div className="flex gap-4 mt-8">

                    <button
                      onClick={() => acceptRequest(request.id)}
                      className="flex-1 bg-green-500 hover:bg-green-600 rounded-xl py-3 font-semibold transition"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => rejectRequest(request.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 rounded-xl py-3 font-semibold transition"
                    >
                      Reject
                    </button>

                  </div>
                )}
                {request.status === "ACCEPTED" && (
  <Link to={`/chat/${request.senderId}`}>
    <button className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold transition">
      Open Chat
    </button>
  </Link>
)}
              </div>
            ))
          )}
        </div>

        {/* Sent Requests */}
        <h2 className="text-3xl font-bold text-pink-400 mt-14 mb-6">
          Sent Requests
        </h2>

        <div className="space-y-6">
          {sentRequests.length === 0 ? (
            <p className="text-gray-400">No sent requests.</p>
          ) : (
            sentRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-lg hover:scale-[1.02] transition"
              >
                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-pink-500 flex items-center justify-center text-xl font-bold">
                      {getUserName(request.receiverId).charAt(0)}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">
                        {getUserName(request.receiverId)}
                      </h3>

                      <p className="text-gray-400">
                        SkillSwap User
                      </p>
                    </div>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>

                </div>

                <div className="mt-6">
                  <p className="text-cyan-400 font-semibold">
                    You Offer
                  </p>

                  <span className="inline-block mt-2 px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300">
                    {request.offeredSkill}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-pink-400 font-semibold">
                    You Want
                  </p>

                  <span className="inline-block mt-2 px-4 py-2 rounded-full bg-pink-500/20 text-pink-300">
                    {request.requestedSkill}
                  </span>
                </div>
                {request.status === "ACCEPTED" && (
  <Link to={`/chat/${request.receiverId}`}>
    <button className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold transition">
      Open Chat
    </button>
  </Link>
)}

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Requests;