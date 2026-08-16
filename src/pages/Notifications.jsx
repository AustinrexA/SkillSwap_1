import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

function Notifications() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    api
      .get(`/notifications/${user.id}`)
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error(err));
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/read/${id}`);
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto pt-32 px-6">
        <h1 className="text-5xl font-bold mb-10">
          Notifications
        </h1>

        {notifications.length === 0 ? (
          <p className="text-gray-400">
            No notifications yet.
          </p>
        ) : (
          <div className="space-y-5">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-2xl p-6 border transition ${
                  notification.read
                    ? "bg-white/5 border-white/10"
                    : "bg-cyan-500/10 border-cyan-500"
                }`}
              >
                <p className="text-lg">
                  {notification.message}
                </p>

                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="mt-4 bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;