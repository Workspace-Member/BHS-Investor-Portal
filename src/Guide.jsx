import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Home,
  Map,
  Truck,
  User,
  HelpCircle,
  PhoneCall,
} from "lucide-react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const GuideSection = ({ title, icon, content, isOpen, toggle, link }) => (
  <div className="mb-6 bg-[#493939] rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out">
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between p-4 text-left focus:outline-none hover:bg-[#3a2a2a]"
    >
      <div className="flex items-center">
        {icon}
        <h2 className="text-xl font-semibold ml-3 text-white">{title}</h2>
      </div>
      <ChevronRight
        className={`w-5 h-5 text-[#FF9321] transform transition-transform duration-300 ${
          isOpen ? "rotate-90" : ""
        }`}
      />
    </button>
    {isOpen && (
      <div className="p-4 bg-[#3a2a2a]">
        <p className="text-white text-lg italic mb-3 px-4">
          {title} allows you to access the following details:
        </p>
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="flex items-start px-4 sm:px-10">
              <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-[#FF9321] mr-2"></div>
              <span className="text-white">{item}</span>
            </li>
          ))}
          <li className="mt-4 px-4 sm:px-10">
            <Link
              to={link}
              className="inline-flex items-center px-4 py-2 bg-[#FF9321] border border-[#FF9321] text-white rounded-md hover:border-white font-bold"
            >
              Go to {title}
            </Link>
          </li>
        </ul>
      </div>
    )}
  </div>
);

const GuidePage = () => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      title: "Dashboard",
      icon: <Home className="w-6 h-6 text-[#FF9321]" />,
      content: [
        "Initial Investment",
        "Current Investment Value",
        "Number of Assets",
        "Ticket Size",
        "Agreed ROI and Lock-In Period",
        "View Contract button",
        "Latest Updates",
        "Number of Trips So Far",
        "Currently Active Trucks",
      ],
      link: "/",
    },
    {
      title: "Trips",
      icon: <Map className="w-6 h-6 text-[#FF9321]" />,
      content: [
        "Trip History: value, origin, destination, start date, end date, and calculations for each trip",
      ],
      link: "/trips",
    },
    {
      title: "Assets",
      icon: <Truck className="w-6 h-6 text-[#FF9321]" />,
      content: [
        "List of your assets",
        "Links to view more details about each asset",
      ],
      link: "/assets",
    },
    {
      title: "Profile",
      icon: <User className="w-6 h-6 text-[#FF9321]" />,
      content: ["Personal and investment details"],
      link: "/profile",
    },
    {
      title: "Guide",
      icon: <HelpCircle className="w-6 h-6 text-[#FF9321]" />,
      content: [
        "You're currently reading the guide",
        "Return here anytime for help navigating the website",
      ],
      link: "/guide",
    },
    {
      title: "Contact",
      icon: <PhoneCall className="w-6 h-6 text-[#FF9321]" />,
      content: ["Customer support details"],
      link: "/contact",
    },
  ];

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-[#322323] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-[#FF9321] sm:text-5xl md:text-6xl">
              Website Navigation Guide
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-white sm:text-2xl md:mt-5 md:max-w-3xl">
              Welcome to our investment tracking platform. This guide will help
              you navigate through the various sections of the website.
            </p>
          </div>

          {/* Guide Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <GuideSection
                key={index}
                {...section}
                isOpen={openSection === index}
                toggle={() =>
                  setOpenSection(openSection === index ? null : index)
                }
              />
            ))}
          </div>

          {/* Footer Description */}
          <div className="mt-12 p-6 bg-[#493939] rounded-lg shadow-lg border border-[#FF9321]">
            <p className="text-lg text-white font-medium">
              By following this guide, you should have an easy time managing
              your investments and keeping track of your assets. Happy
              investing!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidePage;
