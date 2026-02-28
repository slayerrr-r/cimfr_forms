import { Routes, Route } from "react-router-dom";
import PartyDashboard from "./pages/PartyDashboard";
import PartySamples from "./pages/PartySamples";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PartyDashboard />} />
      <Route path="/party/:partyId" element={<PartySamples />} />
    </Routes>
  );
}

export default App;