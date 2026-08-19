import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/admin", icon: "📊" },
    { name: "Users", path: "/admin/users", icon: "👥" },
    { name: "Swap Requests", path: "/admin/swaps", icon: "🔄" },
    { name: "Messages", path: "/admin/messages", icon: "💬" },
   
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-900 border-r border-white/10 p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        SkillSwap
      </h1>
      

      <div className="space-y-3">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname === menu.path
                ? "bg-cyan-500 text-white"
                : "hover:bg-white/10 text-gray-300"
            }`}
          >
            
            <span>{menu.icon}</span>
            <span>{menu.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminSidebar;