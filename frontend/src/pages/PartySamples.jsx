import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function PartySamples() {

  const { partyId } = useParams();
  const navigate = useNavigate();

  const [partyName, setPartyName] = useState("");
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sampleName, setSampleName] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);

  const testOptions = [
    "Proximate Analysis",
    "Ultimate Analysis",
    "GCV Test",
    "Moisture Test",
    "Ash Content"
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const party = await api.getParty(partyId);
      setPartyName(party.name);

      const samplesData = await api.getSamples(partyId);
      setSamples(samplesData);
    } catch (err) {
      setError(err.message || "Failed to load party or samples");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [partyId]);

  const addSample = async () => {

    if (!sampleName.trim() || selectedTests.length === 0) {
      alert("Enter sample name and select tests");
      return;
    }

    try {
      await api.createSample(partyId, {
        name: sampleName,
        tests: selectedTests
      });
      setSampleName("");
      setSelectedTests([]);
      await fetchData();
    } catch (err) {
      alert(err.message || "Failed to add sample");
    }
  };

  const deleteSample = async (id) => {

    if (!window.confirm("Delete this sample?")) return;

    try {
      await api.deleteSample(id);
      await fetchData();
    } catch (err) {
      alert(err.message || "Failed to delete sample");
    }

  };



  const filteredSamples = samples.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );



  return (

    <div className="container-fluid py-4">


      {/* PAGE HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="page-title">Sample Management</h2>
          <p className="text-muted mb-0">
            Party: <strong>{partyName}</strong>
          </p>
        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

      </div>

      <div className="card shadow-sm border-0 mb-4 p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Sample Name</label>
            <input
              className="form-control"
              placeholder="Enter sample name"
              value={sampleName}
              onChange={(e) => setSampleName(e.target.value)}
            />
          </div>
        </div>

        <label className="form-label mb-2 mt-4">
          Select Required Tests
        </label>

        <div className="row">
          {testOptions.map((test) => (
            <div className="col-md-4 mb-2" key={test}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedTests.includes(test)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTests([...selectedTests, test]);
                    } else {
                      setSelectedTests(
                        selectedTests.filter((t) => t !== test)
                      );
                    }
                  }}
                />

                <label className="form-check-label">
                  {test}
                </label>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn btn-primary mt-3"
          onClick={addSample}
        >
          Add Sample
        </button>
      </div>

      {/* SAMPLE LIST */}

      <div className="section-card">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <h5 className="mb-0">Previous Samples</h5>

          <input
            className="form-control"
            style={{ maxWidth: 260 }}
            placeholder="Search sample..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>



        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Sample Name</th>
              <th>Date</th>
              <th>Tests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                  Loading samples...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="text-center text-danger py-4">
                  Error loading samples: {error}
                </td>
              </tr>
            ) : filteredSamples.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No samples found
                </td>
              </tr>
            ) : (
              filteredSamples.map((sample) => (
                <tr key={sample.id}>
                  <td
                    style={{ cursor: "pointer", color: "#2563eb", fontWeight: 500 }}
                    onClick={() =>
                      navigate(`/sample/${partyId}/${sample.id}`)
                    }
                  >
                    {sample.name}
                  </td>

                  <td>{sample.date}</td>

                  <td>{sample.tests.join(", ")}</td>

                  <td>
                    <span className="badge bg-secondary">
                      {sample.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() =>
                        navigate(`/sample/${partyId}/${sample.id}`)
                      }
                    >
                      Open
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteSample(sample.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}