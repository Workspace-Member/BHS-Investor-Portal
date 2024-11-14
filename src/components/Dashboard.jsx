import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import StatsTable from "./StatsTable";
import LogTable from "./LogTable";

import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import TripsTable from "./TripsTable";
import TheTable from "./TheTable";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // Import useAuth for user context

const Dashboard = () => {

  const { id } = useParams();
  console.log("id", id)
  const { user, token } = useAuth(); // Get user and token from AuthContext
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const col = ["To", "From", "Start Date", "End Date"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/user/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
        console.log("data: ", response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  console.log("Data: ", user)


  const statscol = ["Time", "Truck", "Location", "Speed", "Trip Number"]

  const logrow = [
    { time: "08:00", truck: "T-001", location: "Warehouse A", speed: "45 mph", tripNumber: "TR-1001" },
    { time: "09:15", truck: "T-002", location: "Route 66", speed: "55 mph", tripNumber: "TR-1002" },
    { time: "10:30", truck: "T-003", location: "City Center", speed: "30 mph", tripNumber: "TR-1003" },
    { time: "11:45", truck: "T-004", location: "Highway 101", speed: "65 mph", tripNumber: "TR-1004" },
    { time: "13:00", truck: "T-005", location: "Warehouse B", speed: "0 mph", tripNumber: "TR-1005" },
    { time: "14:15", truck: "T-006", location: "Main Street", speed: "25 mph", tripNumber: "TR-1006" },
    { time: "15:30", truck: "T-007", location: "Industrial Park", speed: "35 mph", tripNumber: "TR-1007" },
    { time: "16:45", truck: "T-008", location: "Suburb Area", speed: "40 mph", tripNumber: "TR-1008" },
  ];

  useEffect(() => {
    // Generate random data for the line chart
    const generateRandomData = () => {
      const currentDate = new Date();
      return [...Array(28)].map((_, i) => {
        const date = new Date(
          currentDate.getTime() - (27 - i) * 24 * 60 * 60 * 1000
        );
        const views = Math.floor(Math.random() * 1000000);
        return {
          date: `${date.getMonth() + 1}/${date.getDate()}`,
          views: views,
        };
      });
    };

    setData(generateRandomData());
  }, []);
  // const user = {
  //   name: "John Doe",
  //   _id: "I75646",
  //   initialInvestmentValue: "311M",
  //   assets: "12",

  // };
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.addImage("/path-to-chart.png", "PNG", 10, 10, 190, 120);
    doc.setFontSize(16);
    doc.text("Investment Dashboard", 20, 150);
    doc.setFontSize(12);
    doc.text(user.name || "User", 20, 170);
    doc.text(`Investor ID: ${user.userId || "N/A"}`, 20, 180);
    doc.save("investment-dashboard.pdf");
  };

  const downloadContract = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Contract Details", 20, 20);
    doc.setFontSize(12);
    doc.text(`Contract ID: ${user._id || "N/A"}`, 20, 40);
    doc.text("Start Date: 01/01/2023", 20, 50); // Example static date
    doc.text("End Date: 12/31/2023", 20, 60); // Example static date
    doc.text(
      `Investment Amount: ${user.initialInvestmentValue || "N/A"}`,
      20,
      70
    );
    doc.save("investment-contract.pdf");
  };

  return (
    <div className="bg-[#322323] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-3xl font-bold text-[#FF9321]">
            Hello, {user.name || "Investor"}
          </h2>
          <p className="text-base sm:text-lg text-white">
            Investor ID: {user.userId || "N/A"}
          </p>
        </div>

        <main>
          {/* First row of cards */}
          <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card
              title="Investments' Value"
              value={`AED ${data.totalInvestedAmount || "1.80M"}`}
              subtext=""
              subtextColor="text-white"
              textColor="text-white"
            />
            <Card
              title="No. of Investments"
              // value={`${user.initialInvestmentValue || "3"}`}
              value={`${data.numberOfInvestments}`}
              subtext=""
              subtextColor="text-white"
              textColor="text-white"
            />

          {/* </div> */}
          {/* Second row of cards */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"> */}
            
          <Card
              title="No. of Assets"
              value={`${data.numberOfAssets}`} // Example static value
              subtext=""
              subtextColor="text-"
              textColor="text-white"
            /><Card
              title="No. of Trips"
              value={`${data.numberOfTrips}`}
              subtext=""
              subtextColor="text-white"
              textColor="text-white"
            />
          </div>

          <h1 className="text-3xl font-bold mt-3 mb-2 text-[#FF9321]">Latest Updates</h1>
          <LogTable row={logrow} col={statscol}/>
          <p className="text-white">*Terms and Conditions Apply</p>
        </main>
      </div>
    </div>
  );
};

const Card = ({ title, value, subtext, subtextColor, button, textColor }) => (
  <div className="p-4 bg-[#493939] rounded-lg shadow-md">
    <h2 className={`text-lg font-bold mb-2 ${textColor}`}>{title}</h2>
    {value && (
      <p className={`text-2xl sm:text-3xl font-semibold ${textColor}`}>{value}</p>
    )}
    {subtext && <p className={`text-sm ${subtextColor}`}>{subtext}</p>}
    {button}
  </div>
);

const DownloadButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-[#FF9321] border border-[#FF9321] text-white rounded-md hover:border-white font-bold inline-flex items-center mt-2"
  >
    <svg
      className="fill-current w-4 h-4 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
    </svg>
    <span>Download</span>
  </button>
);

export default Dashboard;
