import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import LogTable from "./LogTable";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { id } = useParams();
  console.log("id", id);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const col = ["To", "From", "Start Date", "End Date"];
  console.log("DT: ", token)
  console.log("DU: ", user)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // if (!token) {
      //   toast.error("Authentication token is missing. Please log in again.");
      //   navigate("/login"); // Redirect to login if token is missing
      //   return;
      // }
      try {
        console.log("Fetching data with token:", token);
        // Modify the endpoint if it requires the user ID
        const response = await axiosInstance.get(`/user/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
        console.log("Fetched data: ", response.data);
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        console.error("Error fetching data:", errorMsg);
        toast.error(`Failed to fetch data: ${errorMsg}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);
  console.log("DD: ", data)

  const statscol = ["Time", "Truck", "Location", "Speed", "Trip Number"];

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
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader">Loading...</div>
            </div>
          ) : (
            <>
              {/* First row of cards */}
              <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card
                  title="Investments' Value"
                  value={`AED ${data?.totalInvestedAmount || "1.80M"}`}
                  subtext=""
                  subtextColor="text-white"
                  textColor="text-white"
                />
                <Card
                  title="No. of Investments"
                  value={`${data?.numberOfInvestments || 0}`}
                  subtext=""
                  subtextColor="text-white"
                  textColor="text-white"
                />
                <Card
                  title="No. of Assets"
                  value={`${data?.numberOfAssets || 0}`}
                  subtext=""
                  subtextColor="text-white"
                  textColor="text-white"
                />
                <Card
                  title="No. of Trips"
                  value={`${data?.numberOfTrips || 0}`}
                  subtext=""
                  subtextColor="text-white"
                  textColor="text-white"
                />
              </div>

              <h1 className="text-3xl font-bold mt-3 mb-2 text-[#FF9321]">Latest Updates</h1>
              <LogTable row={logrow} col={statscol}/>
              <p className="text-white">*Terms and Conditions Apply</p>
            </>
          )}
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
