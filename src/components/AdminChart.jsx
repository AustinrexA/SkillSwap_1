import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminChart({ stats }) {
  const data = [
    { name: "Users", value: stats.users },
    { name: "Requests", value: stats.swapRequests },
    { name: "Accepted", value: stats.accepted },
    { name: "Pending", value: stats.pending },
    { name: "Rejected", value: stats.rejected },
    { name: "Messages", value: stats.messages },
  ];

  const colors = [
    "#042458",
    "#4f46e5",
    "#059669",
    "#d97706",
    "#e11d48",
    "#3b82f6",
  ];

  return (
    <div className="bg-white/10 rounded-2xl p-6 border border-white/10 h-[420px]">

      <h2 className="text-2xl font-bold mb-6">
        Platform Analytics
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={140}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={colors[index]}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default AdminChart;