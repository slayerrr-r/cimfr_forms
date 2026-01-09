import React, { useState, useEffect } from "react";
import logo from "../assets/logo.jpg";  // add this at the top of the file

/*
Form1.jsx
- Editable table matching the scanned proximate-analysis sheet.
- Uses localStorage key "form1-data" to save/load.
*/

const initialRow = {
  sn: "1",
  cimfr_sample_no: "",
  party_sample_no: "",
  wt_gms: "",
  moist_pct: "",
  ash_pct: "",
  vm_pct: "",
  fc_pct: "",
  gcv_kcalkg: "",
  remarks: ""
};

export default function Form1() {
  // We'll allow multiple rows — but the scanned form shows 1 sample row.
  const [rows, setRows] = useState([initialRow]);

  // other header fields (top of form)
  const [statementOfAnalysis, setStatementOfAnalysis] = useState("Statement of analysis in respect of");
  const [sampleLabel, setSampleLabel] = useState("S1");
  const [partyName, setPartyName] = useState("");
  const [receivedFrom, setReceivedFrom] = useState("");

  // load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("form1-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.rows) setRows(parsed.rows);
        if (parsed.statementOfAnalysis) setStatementOfAnalysis(parsed.statementOfAnalysis);
        if (parsed.sampleLabel) setSampleLabel(parsed.sampleLabel);
        if (parsed.partyName) setPartyName(parsed.partyName);
        if (parsed.receivedFrom) setReceivedFrom(parsed.receivedFrom);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  function updateCell(idx, field, value) {
    setRows((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  }

  function addRow() {
    setRows((prev) => [...prev, { ...initialRow, sn: (prev.length + 1).toString() }]);
  }

  function removeRow(idx) {
    setRows((prev) => prev.filter((_, i) => i !== idx));
  }

  function save() {
    const data = {
      statementOfAnalysis,
      sampleLabel,
      partyName,
      receivedFrom,
      rows
    };
    localStorage.setItem("form1-data", JSON.stringify(data));
    alert("Saved locally (localStorage).");
  }

  function clearAll() {
    if (!confirm("Clear all data from this form?")) return;
    setRows([initialRow]);
    setStatementOfAnalysis("Statement of analysis in respect of");
    setSampleLabel("S1");
    setPartyName("");
    setReceivedFrom("");
    localStorage.removeItem("form1-data");
  }

  return (
    <div className="form-sheet">
      <div className="sheet-header">
  {/* LEFT SIDE: LOGO + HINDI + ENGLISH */}
  <div className="header-left">
    <img src={logo} className="lab-logo" alt="Lab Logo" />

    <div className="header-text">
      <div className="hindi-title">
        सी.एस.आई.आर.  केन्द्रीय खनन एवं ईंधन अनुसंधान संस्थान, नागपुर
      </div>

      <div className="eng-title">
        CSIR - CENTRAL INSTITUTE OF MINING AND FUEL RESEARCH
      </div>

      <div className="eng-sub">
        NAGPUR RESEARCH CENTRAL (FUEL SCIENCE)
      </div>
    </div>
  </div>

  {/* RIGHT SIDE: CONSTANT BOX */}
  <div className="header-right">
    <div className="top-right-box">Form 1</div>
  </div>
</div>


      <section className="top-fields">
        <div className="row">
          <label>Statement of analysis:</label>
          <input value={statementOfAnalysis} onChange={(e) => setStatementOfAnalysis(e.target.value)} />
        </div>
        <div className="row">
          <label>Sample label (e.g., S1):</label>
          <input value={sampleLabel} onChange={(e) => setSampleLabel(e.target.value)} />
        </div>
        <div className="row">
          <label>Party name:</label>
          <input value={partyName} onChange={(e) => setPartyName(e.target.value)} />
        </div>
        <div className="row">
          <label>Received from:</label>
          <input value={receivedFrom} onChange={(e) => setReceivedFrom(e.target.value)} />
        </div>
      </section>

      <section className="table-section">
        <table className="sheet-table">
          <thead>
            <tr>
              <th>S. NO</th>
              <th>CIMFR Sample No.</th>
              <th>Party Sample No.</th>
              <th>Wt. in gms</th>
              <th>Moist %</th>
              <th>Ash %</th>
              <th>V.M. %</th>
              <th>F.C. %</th>
              <th>G.C.V (kcal/kg)</th>
              <th>Remarks</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                <td>
                  <input value={r.sn} onChange={(e) => updateCell(idx, "sn", e.target.value)} />
                </td>

                <td>
                  <input
                    value={r.cimfr_sample_no}
                    onChange={(e) => updateCell(idx, "cimfr_sample_no", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    value={r.party_sample_no}
                    onChange={(e) => updateCell(idx, "party_sample_no", e.target.value)}
                  />
                </td>

                <td>
                  <input value={r.wt_gms} onChange={(e) => updateCell(idx, "wt_gms", e.target.value)} />
                </td>

                <td>
                  <input value={r.moist_pct} onChange={(e) => updateCell(idx, "moist_pct", e.target.value)} />
                </td>

                <td>
                  <input value={r.ash_pct} onChange={(e) => updateCell(idx, "ash_pct", e.target.value)} />
                </td>

                <td>
                  <input value={r.vm_pct} onChange={(e) => updateCell(idx, "vm_pct", e.target.value)} />
                </td>

                <td>
                  <input value={r.fc_pct} onChange={(e) => updateCell(idx, "fc_pct", e.target.value)} />
                </td>

                <td>
                  <input value={r.gcv_kcalkg} onChange={(e) => updateCell(idx, "gcv_kcalkg", e.target.value)} />
                </td>

                <td>
                  <input value={r.remarks} onChange={(e) => updateCell(idx, "remarks", e.target.value)} />
                </td>

                <td>
                  <button className="btn btn-danger" onClick={() => removeRow(idx)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 10 }}>
          <button className="btn" onClick={addRow}>
            + Add Row
          </button>
        </div>
      </section>

      <section className="actions">
        <button className="btn" onClick={save}>
          Save (local)
        </button>
        <button className="btn" onClick={() => window.location.reload()}>
          Refresh page
        </button>
        <button className="btn" onClick={clearAll}>
          Clear
        </button>
      </section>

      <section style={{ marginTop: 18 }}>
        <small style={{ color: "#666" }}>
          Tip: This is a starting prototype. After you confirm the fields, I can provide Form2 and Form3 pages,
          wiring to a FastAPI backend, and PDF print/export.
        </small>
      </section>
    </div>
  );
}
