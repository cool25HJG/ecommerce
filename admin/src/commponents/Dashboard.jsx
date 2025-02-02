import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "../App.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ users }) => {
  // State to hold user counts
  const [userCounts, setUserCounts] = useState({
    allUsers: 0,
    sellers: 0,
    clients: 0,
    admins: 0,
  });

  // Calculate user counts based on the `users` array
  useEffect(() => {
    if (users && users.length > 0) {
      const sellers = users.filter((user) => user.role === "seller").length;
      const clients = users.filter((user) => user.role === "client").length;
      const admins = users.filter((user) => user.role === "admin").length;

      setUserCounts({
        allUsers: users.length,
        sellers,
        clients,
        admins,
      });
    }
  }, [users]);

  // Data for the bar chart
  const chartData = {
    labels: ["All Users", "Sellers", "Clients", "Admins"],
    datasets: [
      {
        label: "Number of Users",
        data: [
          userCounts.allUsers,
          userCounts.sellers,
          userCounts.clients,
          userCounts.admins,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Distribution",
      },
    },
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <div className="row">
        {/* All Users Card */}
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">All Users</h5>
              <p className="card-text display-4">{userCounts.allUsers}</p>
            </div>
          </div>
        </div>

        {/* Sellers Card */}
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Sellers</h5>
              <p className="card-text display-4">{userCounts.sellers}</p>
            </div>
          </div>
        </div>

        {/* Clients Card */}
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Clients</h5>
              <p className="card-text display-4">{userCounts.clients}</p>
            </div>
          </div>
        </div>

        {/* Admins Card */}
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Admins</h5>
              <p className="card-text display-4">{userCounts.admins}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;