import React, { useState, useEffect } from "react";
import logo from "../assets/logo.jpg";
import { useParams } from "react-router-dom";

/*
Form1.jsx
- Editable table matching the scanned proximate-analysis sheet.
- Party-wise save/load using localStorage key: form1-data-<partyId>
- Also auto-fills party details from PartyDashboard stored "parties"
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
  remarks: "",
};

export default function Form1() {
  const { partyId } = useParams();

  // ✅ Party-specific key
  const storageKey = `form1-data-${partyId || "default"}`;

  // table rows
  const [rows, setRows] = useState([initialRow]);

  // top fields
  const [statementOfAnalysis, setStatementOfAnalysis] = useState(
    "Statement of analysis in respect of"
  );
  const [sampleLabel, setSampleLabel] = useState("S1");
  const [partyName, setPartyName] = useState("");
  const [receivedFrom, setReceivedFrom] = useState("");

  // extra party details (from dashboard)
  const [partyContact, setPartyContact] = useState("");
  const [partyEmail, setPartyEmail] = useState("");

  // ✅ Load Party Info from Dashboard parties list
  useEffect(() => {
    const partiesRaw = localStorage.getItem("parties");
    if (partiesRaw && partyId) {
      try {
        const parties = JSON.parse(partiesRaw);
        const found = parties.find((p) => String(p.id) === String(partyId));
        if (found) {
          setPartyName(found.name || "");
          setPartyContact(found.contact || "");
          setPartyEmail(found.email || "");
          setReceivedFrom(found.name || "");
        }
      } catch (e) {
        console.log("Error reading parties from localStorage");
      }
    }
  }, [partyId]);

  // ✅ Load Form1 saved data for this party
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (parsed.rows) setRows(parsed.rows);
        if (parsed.statementOfAnalysis)
          setStatementOfAnalysis(parsed.statementOfAnalysis);
        if (parsed.sampleLabel) setSampleLabel(parsed.sampleLabel);
        if (parsed.partyName) setPartyName(parsed.partyName);
        if (parsed.receivedFrom) setReceivedFrom(parsed.receivedFrom);

        // If you save these too (optional)
        if (parsed.partyContact) setPartyContact(parsed.partyContact);
        if (parsed.partyEmail) setPartyEmail(parsed.partyEmail);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, [storageKey]);

  function updateCell(idx, field, value) {
    setRows((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      { ...initialRow, sn: (prev.length + 1).toString() },
    ]);
  }

  function removeRow(idx) {
    setRows((prev) => prev.filter((_, i) => i !== idx));
  }

  function save() {
    const data = {
      partyId,
      statementOfAnalysis,
      sampleLabel,
      partyName,
      receivedFrom,
      partyContact,
      partyEmail,
      rows,
    };

    localStorage.setItem(storageKey, JSON.stringify(data));
    alert("Saved for this party ✅");
  }

  function clearAll() {
    if (!confirm("Clear all data from this form?")) return;

    setRows([initialRow]);
    setStatementOfAnalysis("Statement of analysis in respect of");
    setSampleLabel("S1");
    setPartyName("");
    setReceivedFrom("");
    setPartyContact("");
    setPartyEmail("");

    localStorage.removeItem(storageKey);
  }

  return (
    <div className="form-sheet">
      {/* ✅ PARTY INFO BAR */}
      <div
        style={{
          background: "#f2f6ff",
          border: "1px solid #c9d8ff",
          padding: "10px 12px",
          borderRadius: 8,
          marginBottom: 12,
          fontSize: 14,
        }}
      >
        <b>Opened for Party:</b> {partyName || "Not Selected"}{" "}
        {partyId ? (
          <span style={{ color: "#666" }}>(ID: {partyId})</span>
        ) : null}
        <div style={{ marginTop: 4, color: "#444" }}>
          <span style={{ marginRight: 16 }}>
            📞 <b>{partyContact || "-"}</b>
          </span>
          <span>
            ✉️ <b>{partyEmail || "-"}</b>
          </span>
        </div>
      </div>

      {/* HEADER */}
      <div className="sheet-header">
        <div className="header-left">
          <img src={logo} className="lab-logo" alt="Lab Logo" />

          <div className="header-text">
            <div className="hindi-title">
              सी.एस.आई.आर. केन्द्रीय खनन एवं ईंधन अनुसंधान संस्थान, नागपुर
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
          <div className="top-right-box">Form 1</div>
        </div>
      </div>

      {/* TOP FIELDS */}
      <section className="top-fields">
        <div className="row">
          <label>Statement of analysis:</label>
          <input
            value={statementOfAnalysis}
            onChange={(e) => setStatementOfAnalysis(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Sample label (e.g., S1):</label>
          <input
            value={sampleLabel}
            onChange={(e) => setSampleLabel(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Party name:</label>
          <input
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Received from:</label>
          <input
            value={receivedFrom}
            onChange={(e) => setReceivedFrom(e.target.value)}
          />
        </div>
      </section>

      {/* TABLE */}
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
                  <input
                    value={r.sn}
                    onChange={(e) => updateCell(idx, "sn", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    value={r.cimfr_sample_no}
                    onChange={(e) =>
                      updateCell(idx, "cimfr_sample_no", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={r.party_sample_no}
                    onChange={(e) =>
                      updateCell(idx, "party_sample_no", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={r.wt_gms}
                    onChange={(e) =>
                      updateCell(idx, "wt_gms", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={r.moist_pct}
                    onChange={(e) =>
                      updateCell(idx, "moist_pct", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={r.ash_pct}
                    onChange={(e) =>
                      updateCell(idx, "ash_pct", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={r.vm_pct}
                    onChange={(e) =>
                      updateCell(idx, "vm_pct", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={r.fc_pct}
                    onChange={(e) =>
                      updateCell(idx, "fc_pct", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={r.gcv_kcalkg}
                    onChange={(e) =>
                      updateCell(idx, "gcv_kcalkg", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    value={r.remarks}
                    onChange={(e) =>
                      updateCell(idx, "remarks", e.target.value)
                    }
                  />
                </td>

                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeRow(idx)}
                  >
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

      {/* ACTIONS */}
      <section className="actions">
        <button className="btn" onClick={save}>
          Save (local)
        </button>
        <button className="btn" onClick={clearAll}>
          Clear
        </button>
      </section>

      <section style={{ marginTop: 18 }}>
        <small style={{ color: "#666" }}>
          Saved party-wise using localStorage key: <b>{storageKey}</b>
        </small>
      </section>
    </div>
  );
}
