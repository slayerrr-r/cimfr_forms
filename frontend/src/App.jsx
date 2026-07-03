import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import PartyDashboard from "./pages/PartyDashboard";
import PartySamples from "./pages/PartySamples";
import MasterForm from "./pages/MasterForm";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/parties" element={<PartyDashboard />} />
        <Route path="/party/:partyId" element={<PartySamples />} />
        <Route path="/sample/:partyId/:sampleId" element={<MasterForm />} />
      </Routes>
    </MainLayout>
  );
}

export default App;