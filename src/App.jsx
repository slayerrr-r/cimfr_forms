import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import PartyDashboard from "./pages/PartyDashboard";
import Form1 from "./pages/Form1";
import Form2 from "./pages/Form2";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Lab Forms — Editable</h1>

      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 15 }}>Dashboard</Link>
        <Link to="/form2">Form 2</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PartyDashboard />} />

        {/* Party-specific Form1 */}
        <Route path="/form1/:partyId" element={<Form1 />} />

        <Route path="/form2" element={<Form2 />} />
      </Routes>
    </div>
  );
}
