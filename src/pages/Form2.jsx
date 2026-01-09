import React, { useState, useEffect } from "react";
import logo from "../assets/logo.jpg";

const initialData = {
  baseSample: "S1",
  derivedSample: "S2",
  moisture: "",
  ash: "",
  vm: "",
  fc: "",
  gcv: "",
  remarks: ""
};

export default function Form2() {
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    const saved = localStorage.getItem("form2-data");
    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, []);

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  function save() {
    localStorage.setItem("form2-data", JSON.stringify(form));
    alert("Form 2 saved locally");
  }

  function clearForm() {
    if (!confirm("Clear Form 2?")) return;
    setForm(initialData);
    localStorage.removeItem("form2-data");
  }

  return (
    <div className="form-sheet">
      {/* HEADER */}
      <div className="sheet-header">
        <div className="header-left">
          <img src={logo} className="lab-logo" alt="logo" />

          <div className="header-text">
            <div className="hindi-title">
              सी.एस.आई.आर  केन्द्रीय खनन एवं ईंधन अनुसंधान संस्थान, नागपुर
            </div>
            <div className="eng-title">
              CSIR - CENTRAL INSTITUTE OF MINING AND FUEL RESEARCH
            </div>
            <div className="eng-sub">
              NAGPUR RESEARCH CENTRAL (FUEL SCIENCE)
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="top-right-box">Form 2</div>
        </div>
      </div>

      {/* BODY */}
      <section className="top-fields">
        <div className="row">
          <label>Base Sample (from Form 1)</label>
          <input value={form.baseSample} onChange={e => update("baseSample", e.target.value)} />
        </div>

        <div className="row">
          <label>Derived Sample</label>
          <input value={form.derivedSample} onChange={e => update("derivedSample", e.target.value)} />
        </div>
      </section>

      <section className="table-section">
        <table className="sheet-table">
          <thead>
            <tr>
              <th>Moist %</th>
              <th>Ash %</th>
              <th>VM %</th>
              <th>FC %</th>
              <th>GCV (kcal/kg)</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td><input value={form.moisture} onChange={e => update("moisture", e.target.value)} /></td>
              <td><input value={form.ash} onChange={e => update("ash", e.target.value)} /></td>
              <td><input value={form.vm} onChange={e => update("vm", e.target.value)} /></td>
              <td><input value={form.fc} onChange={e => update("fc", e.target.value)} /></td>
              <td><input value={form.gcv} onChange={e => update("gcv", e.target.value)} /></td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="top-fields">
        <div className="row">
          <label>Remarks</label>
          <input value={form.remarks} onChange={e => update("remarks", e.target.value)} />
        </div>
      </section>

      <section className="actions">
        <button className="btn" onClick={save}>Save</button>
        <button className="btn" onClick={clearForm}>Clear</button>
      </section>
    </div>
  );
}
