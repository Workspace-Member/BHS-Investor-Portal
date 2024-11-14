import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import TripsTable from "./TripsTable";
import TheTable from "./TheTable";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // Import useAuth for user context

const Investment = () => {
  const [isEditing, setIsEditing] = useState(false);
  // const [investmentInfo, setInvestmentInfo] = useState({
  //   "Investment ID": "INV001",
  //   "Investor Name": "Deepak Bhagchandani",
  //   "Investor ID": "I1",
  //   Amount: "50000",
  //   ROI: "10096",
  //   Contract: "contract_INV001.pdf",
  //   "Deposit Date": "2022-01-15",
  //   "Maturity Date": "2023-01-15",
  // });

  const { id } = useParams();
  console.log("id", id)
  const { user, token } = useAuth(); // Get user and token from AuthContext
  const navigate = useNavigate();

  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestment = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/investments/me/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvestment(response.data);
        console.log("Data: ", response.data)
      } catch (error) {
        console.error("Error fetching investment:", error);
        toast.error("Failed to fetch investment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvestment();
  }, [id, token]);

  console.log("Data: ", investment)

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (field, value) => {
    setInvestment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated information to a backend
    console.log("Saving updated investment info:", investment);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // Handle file upload logic here
    console.log("Uploaded file:", file);
    setInvestment((prev) => ({
      ...prev,
      Contract: file ? file.name : prev.Contract,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#322323]">
      <div className="flex justify-center w-full flex-grow bg-[#322323] p-4 overflow-y-auto custom-scrollbar">
        <div className="w-4/5 bg-[#493939] rounded-lg shadow-md p-6 my-6 lg:m-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="ml-10 text-3xl font-bold text-[#FF9321]">
              Investment
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-0 mt-8 ml-4 w-full">
            {/* <div className="border border-[#FF9321] rounded-lg p-4 mb-4">
              {Object.entries(investment).map(([fieldKey, fieldValue]) => (
                <div key={fieldKey} className="mb-6">
                  <div className="p-4 flex justify-around items-center w-full h-12">
                    <span className="w-2/5 text-md font-bold text-center text-[#FF9321]">
                      {fieldKey}
                    </span>
                    {isEditing ? (
                      fieldKey === "Contract" ? (
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          className="w-1/2 text-md font-semibold text-white text-center"
                        />
                      ) : (
                        <input
                          type="text"
                          value={fieldValue}
                          onChange={(e) =>
                            handleChange(fieldKey, e.target.value)
                          }
                          className="w-1/2 text-md font-semibold text-white text-center border rounded-lg border-[#FF9321] bg-[#322323]"
                        />
                      )
                    ) : fieldKey === "Contract" ? (
                      <span className="w-1/2 text-md font-semibold text-white text-center">
                        <a
                          href="#"
                          className="text-[#FF9321] underline"
                          onClick={() =>
                            console.log("Download contract:", fieldValue)
                          }
                        >
                          {fieldValue}
                        </a>
                      </span>
                    ) : (
                      <span className="w-1/2 text-md font-semibold text-white text-center">
                        {fieldValue}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div> */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Investment;
