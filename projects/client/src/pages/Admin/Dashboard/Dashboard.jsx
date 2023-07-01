import React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { savePDF } from "@progress/kendo-react-pdf";
import { DonutChartContainer } from "../../../components/DonutChartContainer";
import { BarChartContainer } from "../../../components/BarChartContainer";
import GridContainer from "../../../components/GridContainer";
import PanelBarContainer from "../../../components/PanelBarContainer";
import Sidebar from "../../../components/Sidebar"

import "@progress/kendo-theme-material/dist/all.css";
import "../Dashboard/Dashboard.css";

function Dashboard() {
  const handlePDFExport = () => {
    savePDF(document.documentElement, { paperSize: "auto" });
  };

  const handleShare = () => {
    // Handle share logic here
  };

  return (
    <div className="app-container">
      <Sidebar />
      {/* Header */}
      <header className="header row">
        {/* Header content */}
      </header>

      {/* Main content */}
      <div className="row">
        {/* Side panel */}
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">
          <PanelBarContainer />
        </div>

        {/* Sales Dashboard */}
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
          <div className="row">
            {/* Percentage containers */}
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-2 col-xl-2">
              {/* Percentage containers content */}
            </div>

            {/* Donut chart */}
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
              <DonutChartContainer />
            </div>

            {/* Bar chart */}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <BarChartContainer />
            </div>
          </div>

          {/* Grid container */}
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <GridContainer />
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      {/* Render the dialog component here */}
    </div>
  );
}

export default Dashboard;
