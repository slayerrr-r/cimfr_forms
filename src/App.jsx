import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Form1 from "./pages/Form1";
import Form2 from "./pages/Form2";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Lab Forms — Editable</h1>

      <nav style={{ marginBottom: 20 }}>
        <Link to="/form1" style={{ marginRight: 15 }}>Form 1</Link>
        <Link to="/form2">Form 2</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Form1 />} />
        <Route path="/form1" element={<Form1 />} />
        <Route path="/form2" element={<Form2 />} />
      </Routes>
    </div>
  );
}
