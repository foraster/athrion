import { useEffect, useState } from "react";
import { fetchAllOrders } from "../../http/orderAPI";
import { fromCents } from "../../utils/helpers";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  // Load orders from API on mount
  useEffect(() => {
    fetchAllOrders()
      .then(setOrders)
      .catch((err) => {
        console.error("Failed to load orders", err);
        setError("Failed to load order data");
      });
  }, []);

  const totalOrders = orders.length;
  // Calculate total revenue and average order value
  const totalRevenue = orders.reduce((sum, o) => sum + o.total_price_cents, 0);
  const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Sales per day
  const salesPerDay = {};
  orders.forEach((order) => {
    const d = new Date(order.createdAt);
    const key = d.toISOString().split("T")[0]; // "2025-06-14"
    if (!salesPerDay[key]) salesPerDay[key] = 0;
    salesPerDay[key] += order.total_price_cents;
  });

  // Prepare data for line chart
  const chartData = Object.entries(salesPerDay)
    .map(([isoDate, total]) => ({
      date: new Date(isoDate),
      label: isoDate.split("-").reverse().join("."), // "14.06.2025"
      revenue: parseFloat(fromCents(total)),
    }))
    .sort((a, b) => a.date - b.date);

  // Order status distribution
  const statusCount = {
    in_progress: 0,
    in_delivery: 0,
    delivered: 0,
    cancelled: 0,
  };
  orders.forEach((order) => {
    if (statusCount[order.status] !== undefined) {
      statusCount[order.status]++;
    }
  });
  const pieData = Object.entries(statusCount).map(([status, value]) => ({
    name: status.replace(/_/g, " "),
    value,
  }));
  const pieColors = ["#DEDBA7", "#72B095", "#1F7872", "#D13F31"];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-gray-400 text-sm">
        Overview of your shop performance.
      </p>
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-gray-700 p-6 rounded-lg shadow text-white">
          <p className="text-sm text-gray-400">Total Orders</p>
          <h2 className="text-3xl font-bold mt-1">{totalOrders}</h2>
        </div>
        <div className="bg-neutral-900 border border-gray-700 p-6 rounded-lg shadow text-white">
          <p className="text-sm text-gray-400">Total Revenue</p>
          <h2 className="text-3xl font-bold mt-1">
            {fromCents(totalRevenue)} €
          </h2>
        </div>
        <div className="bg-neutral-900 border border-gray-700 p-6 rounded-lg shadow text-white">
          <p className="text-sm text-gray-400">Average Order</p>
          <h2 className="text-3xl font-bold mt-1">{fromCents(avgOrder)} €</h2>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-neutral-900 border border-gray-700 p-6 rounded-lg shadow text-white">
        <h3 className="text-lg font-semibold mb-4">Sales Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="label" stroke="#ccc" tick={{ fontSize: 12 }} />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: "#1F7872" }} />
            <Line
              type="linear"
              dataKey="revenue"
              stroke="#1F7872"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-neutral-900 border border-gray-700 p-6 rounded-lg shadow text-white">
        <h3 className="text-lg font-semibold mb-4">Order Status Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              dataKey="value"
              label={({ name }) => name}
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieColors[index % pieColors.length]}
                  strokeWidth={0}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
