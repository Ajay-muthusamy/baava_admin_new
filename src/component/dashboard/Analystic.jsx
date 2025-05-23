import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const Analystic = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://baava-backend-new-1.onrender.com/user/order-details');
        setOrders(response.data);
      } catch (error) {
        console.log('Error fetching analytics data:', error);
      }
    };

    fetchData();
  }, []);

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const dailyCounts = {};
  const weeklyCounts = {};
  const monthlyCounts = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const dayKey = date.toLocaleDateString('en-IN');
    const weekKey = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

    dailyCounts[dayKey] = (dailyCounts[dayKey] || 0) + 1;
    weeklyCounts[weekKey] = (weeklyCounts[weekKey] || 0) + 1;
    monthlyCounts[monthKey] = (monthlyCounts[monthKey] || 0) + 1;
  });

  const formatChartData = (obj) =>
    Object.entries(obj).map(([key, value]) => ({ name: key, orders: value }));

  const todayOrders = orders.filter(order =>
    new Date(order.createdAt).toDateString() === today.toDateString()
  );

  const thisWeekOrders = orders.filter(order =>
    new Date(order.createdAt) >= startOfWeek
  );

  const thisMonthOrders = orders.filter(order =>
    new Date(order.createdAt) >= startOfMonth
  );

  // Helper to safely convert to number
  const getAmount = (order) => Number(order.totalAmount) || 0;

  // Calculate total revenue
  const totalAmountThisMonth = thisMonthOrders.reduce((acc, order) => acc + getAmount(order), 0);
  const totalAmountThisWeek = thisWeekOrders.reduce((acc, order) => acc + getAmount(order), 0);

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">📈 Business Analytics Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-500 text-white rounded-lg p-4 shadow-md text-center">
          <p className="text-xl font-semibold">Total Orders</p>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>
        <div className="bg-green-500 text-white rounded-lg p-4 shadow-md text-center">
          <p className="text-xl font-semibold">This Month</p>
          <p className="text-3xl font-bold">{thisMonthOrders.length}</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-lg p-4 shadow-md text-center">
          <p className="text-xl font-semibold">This Week</p>
          <p className="text-3xl font-bold">{thisWeekOrders.length}</p>
        </div>
        <div className="bg-pink-500 text-white rounded-lg p-4 shadow-md text-center">
          <p className="text-xl font-semibold">Today</p>
          <p className="text-3xl font-bold">{todayOrders.length}</p>
        </div>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-purple-600 text-white rounded-lg p-4 shadow-md text-center">
          <p className="text-xl font-semibold">This Month's Revenue</p>
          <p className="text-2xl font-bold">₹{totalAmountThisMonth.toFixed(2)}</p>
        </div>
        <div className="bg-orange-600 text-white rounded-lg p-4 shadow-md text-center">
          <p className="text-xl font-semibold">This Week's Revenue</p>
          <p className="text-2xl font-bold">₹{totalAmountThisWeek.toFixed(2)}</p>
        </div>
      </div>

      {/* Daily Chart */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">📅 Daily Orders</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formatChartData(dailyCounts)}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#3182CE" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Chart */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">📆 Weekly Orders</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formatChartData(weeklyCounts)}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#38A169" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Chart */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">🗓️ Monthly Orders</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formatChartData(monthlyCounts)}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#DD6B20" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analystic;
