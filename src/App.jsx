import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./userAuth/Login";
import Signup from "./userAuth/Signup";
import Signedup from "./userAuth/Signedup";
import Profile from "./Profile";
import Assets from "./Assets";
import Contract from "./Contract";
import Asset from "./Asset";
import Investment from "./Investment";
import NavBar from "./NavBar";
import ContactForm from "./Contact";
import GuidePage from "./Guide";
import Trips from "./Trips";
import { useState } from "react";
import Review from "./userAuth/Review";
import Dashboard from "./Dashboard";
import Investments from "./Investments";
// <<<<<<< HEAD
// =======

// >>>>>>> b0ccbed (investment ready 2)
const App = () => {
  const [isUser, setIsUser] = useState(true);
  return (
    <>
      <BrowserRouter>
        <NavBar isUser={isUser} setIsUser={setIsUser} />
        <div className="w-full h-full bg-[#EBEBEB]">
          <Routes>
            <Route
              path="/"
              element={
                isUser ? (
                  <Dashboard />
                ) : (
                  <Login isUser={isUser} setIsUser={setIsUser} />
                )
              }
            />
            <Route
              path="/login"
              element={<Login isUser={isUser} setIsUser={setIsUser} />}
            />
            <Route
              path="/signup"
              element={<Signup isUser={isUser} setIsUser={setIsUser} />}
            />
            <Route
              path="/signedup"
              element={<Signedup isUser={isUser} setIsUser={setIsUser} />}
            />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/asset" element={<Asset />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/review" element={<Review />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
