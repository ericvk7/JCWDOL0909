import React from "react";

// components

import CardLineChart from "../../../components/adminCards/CardLineChart.js";
import CardBarChart from "../../../components/adminCards/CardBarChart.js";
import CardPageVisits from "../../../components/adminCards/CardPageVisits.js";
import CardSocialTraffic from "../../../components/adminCards/CardSocialTraffic.js";
import Sidebar from "../../../components/Sidebar.jsx";

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}
