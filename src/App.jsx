import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Requests from "./pages/Requests";
import Notifications from "./pages/Notifications";
import Chat from "./pages/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat/:receiverId" element={<Chat />} />
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/browse"
  element={
    <ProtectedRoute>
      <Browse />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route
  path="/requests"
  element={
    <ProtectedRoute>
      <Requests />
    </ProtectedRoute>
  }
/>
<Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}

export default App;