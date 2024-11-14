import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TheTable from "./TheTable";
import axiosInstance from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Trips = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [ trips, setTrips ] = useState([]);

  const col = [
    "Trip No",
    "Number Plate",
    "To",
    "From",
    "Start Date",
    "End Date",
  ];

useEffect(() => {
  const fetchTrips = async () => {
    try {
      const response = await axiosInstance.get("/trips/me");
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };
  fetchTrips();
}, []);

const data = trips.map((trip, index) => ({
  id: trip._id, // Ensure this matches your backend's ID field
  TripNo: index + 1,
  NumberPlate: trip.NumberPlate,
  To: trip.to,
  From: trip.from,
  StartDate: new Date(trip.startDate).toLocaleDateString("en-US"), // Format the start date
  EndDate: new Date(trip.endDate).toLocaleDateString("en-US"), // Format the end date
}));

  return (
    <div className="w-full flex flex-col bg-[#322323] min-h-[calc(100vh-64px)] pb-2">
      <div className="flex justify-center items-center w-full px-10 py-2 relative mt-5">
        <h1 className="text-4xl font-bold text-[#FF9321]">Trips</h1>
      </div>
      <TheTable row={data} col={col} small={false} link={"/trip/"}clickable={false} />
    </div>
  );
};

export default Trips;
