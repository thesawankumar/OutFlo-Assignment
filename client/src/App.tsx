import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CampaignDashboard from "./pages/CampaignDashboard";
import MessageGenerator from "./pages/MessageGenerator";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CampaignDashboard />} />
        <Route path="/generate" element={<MessageGenerator />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
