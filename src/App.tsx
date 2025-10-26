import React, { useState } from "react";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { EmergencyAlerts } from "./components/EmergencyAlerts";
import { ResourceManagement } from "./components/ResourceManagement";
import { IncidentReporting } from "./components/IncidentReporting";
import { ResponseTeams } from "./components/ResponseTeams";
import { EvacuationPlans } from "./components/EvacuationPlans";
import { WeatherMonitoring } from "./components/WeatherMonitoring";
import { CommunicationCenter } from "./components/CommunicationCenter";
import { Analytics } from "./components/Analytics";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onPageChange={setCurrentPage} />;
      case "alerts":
        return <EmergencyAlerts />;
      case "resources":
        return <ResourceManagement />;
      case "incidents":
        return <IncidentReporting />;
      case "teams":
        return <ResponseTeams />;
      case "evacuation":
        return <EvacuationPlans />;
      case "weather":
        return <WeatherMonitoring />;
      case "communication":
        return <CommunicationCenter />;
      case "analytics":
        return <Analytics />;
      default:
        return <Dashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      {renderPage()}
    </Layout>
  );
}