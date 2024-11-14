// import React, { useState, useEffect, useContext } from "react";
// import AssetsTable from "./AssetsTable";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import TheTable from "./TheTable";

// import { useNavigate, useParams } from "react-router-dom";
// import axiosInstance from "../api/axios";
// import { toast } from "react-toastify";
// import { AuthContext } from "../context/AuthContext.jsx";
// // import Select from "react-select";
// import TripsTable from "./TripsTable";


// const Asset = () => {

//   const { id } = useParams();
//   const { admin, token } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [asset, setAsset] = useState(null);
//   const [initialAsset, setInitialAsset] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [investments, setInvestments] = useState([]);
//   const [adminsList, setAdminsList] = useState([]);
//   const [selectedVerifier, setSelectedVerifier] = useState("");

//   const col = ["To", "From", "Start Date", "End Date"];

//   const paperStyles = {
//     backgroundColor: "#fff",
//     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='1.0'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
//   };

//   useEffect(() => {
//     // Fetch asset details
//     const fetchAsset = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get(`/assets/me/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAsset(response.data);
//         setInitialAsset(response.data);
//         console.log(response.data)
//       } catch (error) {
//         console.error("Error fetching asset:", error);
//         toast.error("Failed to fetch asset details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAsset();
//   }, [id, token]);

//   useEffect(() => {
//     // Fetch investments for the dropdown
//     const fetchInvestments = async () => {
//       try {
//         const response = await axiosInstance.get("/investments/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setInvestments(response.data.investments);
//       } catch (error) {
//         console.error("Error fetching investments:", error);
//       }
//     };

//     fetchInvestments();
//   }, [token]);

//   return (
//     <div className="flex h-[calc(100vh-64px)] bg-[#322323]">
//       {/* Left section: Vehicle information and tables */}
//       <div className="w-full lg:w-3/5 md:w-3/5  bg-[#322323] p-4 overflow-y-auto custom-scrollbar">
//         {/* Vehicle Information Card */}
//         <div className="rounded-lg shadow-md p-6 my-6 lg:m-6 bg-[#493939]">
//           <h2 className="text-2xl font-bold mb-4 text-[#FF9321] text-center ">
//             VEHICLE INFORMATION
//           </h2>
//           <div className="grid grid-cols-2 gap-6 lg:m-6 my-6">
//             {Object.entries(vehicleInfo).map(([key, value]) => (
//               <div
//                 key={key}
//                 className="p-4 bg-[#493939] rounded-lg shadow-md flex flex-col border border-[#FF9321]"
//               >
//                 <span className="text-lg font-bold text-center text-[#FF9321]">{key}</span>
//                 <span className="text-xl font-semibold text-white text-center">
//                   {value}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="bg-[#493939] rounded-lg p-6 my-6 lg:m-6 lg:hidden md:hidden">
//           <h2 className="text-2xl font-bold mb-4 text-[#FF9321] text-center bg-[#493939]">
//             CURRENT LOCATION
//           </h2>
//           <div className="w-full h-[300px] ">
//             <iframe
//               className="w-full h-full rounded-lg"
//               title="Map"
//               src="https://maps.google.com/maps?q=51.5074,0.1278&z=10&output=embed"
//             ></iframe>
//           </div>
//         </div>
//         {/* Truck History Table */}
//         <div className="bg-[#493939] rounded-lg shadow-md py-6 my-6 lg:m-6">
//           <h2 className="text-2xl font-bold lg:mb-4 text-[#FF9321] text-center">
//             TRUCK HISTORY
//           </h2>
//           <TheTable
//             col={TruckHistoryColumn}
//             row={TruckHistoryRow}
//             small={true}
//           />
//         </div>

//         {/* Trip History Table */}
//         <div className="bg-[#493939] rounded-lg shadow-md py-6 my-6 lg:m-6">
//           <h2 className="text-2xl font-bold lg:mb-4 text-[#FF9321] text-center">
//             TRIP HISTORY
//           </h2>
//           <TheTable col={TripsColumn} row={TripsRow} small={true} />
//         </div>

//         {/* New Fuel Chart Card */}
//         <div className="bg-[#493939] rounded-lg shadow-md p-6 my-6 lg:m-6">
//           <h2 className="text-2xl font-bold mb-4 text-[#FF9321] text-center">
//             FUEL CHART
//           </h2>
//           <div className="text-white" style={{ width: "100%", height: 300 }}>
//             <ResponsiveContainer>
//               <LineChart data={fuelData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line dataKey="fuel" stroke="#FF9321" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Right section: Map (visible only on large screens) */}
//       <div
//         className="hidden lg:block lg:w-2/5 md:block md:w-2/5 bg-[#493939]"
//       >
//         <div className="h-full w-full p-6 flex flex-col">
//           <h2 className="text-2xl font-bold mb-4 text-[#FF9321] text-center">
//             CURRENT LOCATION
//           </h2>
//           <div className="h-[calc(100%-40px)] w-full">
//             <iframe
//               className="w-full h-full rounded-md mt-4 mb-8 shadow-2xl justify center"
//               title="Map"
//               src="https://maps.google.com/maps?q=51.5074,0.1278&z=10&output=embed"
//             ></iframe>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Asset;


// src/components/Asset.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import TripsTable from "./TripsTable";
import TheTable from "./TheTable";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // Import useAuth for user context

const Asset = () => {
  const { id } = useParams();
  console.log("id", id)
  const { user, token } = useAuth(); // Get user and token from AuthContext
  const navigate = useNavigate();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  const col = ["To", "From", "Start Date", "End Date"];

  useEffect(() => {
    const fetchAsset = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/assets/me/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAsset(response.data);
      } catch (error) {
        console.error("Error fetching asset:", error);
        toast.error("Failed to fetch asset details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id, token]);

  // Function to safely get nested values
  const getNestedValue = (obj, key) => {
    return key.split(".").reduce((o, k) => (o ? o[k] : ""), obj);
  };

  // Field labels and keys
  const fieldLabels = {
    NumberPlate: "Number Plate",
    Type: "Type",
    Brand: "Brand",
    Model: "Model",
    "investment.investmentId": "Investment ID",
    "investment.investor.name": "Investor Name",
    "investment.investor.userId": "Investor ID",
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10 text-white">
        Loading asset details...
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="flex justify-center items-center mt-10 text-white">
        Asset not found.
      </div>
    );
  }

  console.log("assets.trip, ", asset.trips)
  
  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#322323]">
      {/* Left section: Asset information */}
      <div className="w-full lg:w-3/5 md:w-3/5 bg-[#322323] p-4 overflow-y-auto custom-scrollbar">
        {/* Asset Information Card */}
        <div className="bg-[#493939] rounded-lg shadow-md p-6 m-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-[#FF9321] ml-10">
              Asset Information
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-0 mt-8 ml-4 w-full">
            <div className="border border-[#FF9321] rounded-lg p-4 mb-4">
              {Object.entries(fieldLabels).map(([fieldKey, displayName]) => {
                const fieldValue = getNestedValue(asset, fieldKey);

                return (
                  <div key={fieldKey} className="mb-6">
                    <div className="p-4 flex justify-around items-center w-full h-12">
                      <span className="w-2/5 text-md font-bold text-center text-[#FF9321]">
                        {displayName}
                      </span>
                      <span className="w-1/2 text-md font-semibold text-white text-center">
                        {fieldValue || "N/A"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trips Table */}
          <h2 className="text-3xl font-bold text-[#FF9321] ml-10 mt-4">
              Trip Information
            </h2>
          
          <TheTable
              row={asset.trips.map((trip) => ({
                To: trip.to,
                From: trip.from,
                StartDate: new Date(trip.startDate).toLocaleDateString("en-US"), // Format the start date
                EndDate: new Date(trip.endDate).toLocaleDateString("en-US"), // Format the end date
              }))}
            col={col}
            small={false}
            link={"/trip/"}
            clickable={true}
          />
        </div>
      </div>

      {/* Right section: Map (visible only on large screens) */}
      <div className="hidden lg:block lg:w-2/5 md:block md:w-2/5 bg-[#493939]">
        <div className="h-full w-full p-6 flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-[#FF9321] text-center">
            Current Location
          </h2>
          <div className="h-[calc(100%-40px)] w-full">
            <iframe
              className="w-full h-full rounded-md mt-4 mb-8 shadow-2xl"
              title="Map"
              src="https://maps.google.com/maps?q=51.5074,0.1278&z=10&output=embed"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asset;
