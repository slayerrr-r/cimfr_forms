import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PartySamples() {
  const { partyId } = useParams();
  const navigate = useNavigate();

  const [partyName, setPartyName] = useState("");
  const [samples, setSamples] = useState([]);
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

  // Load Party Name
  useEffect(() => {
    const storedParties = JSON.parse(localStorage.getItem("parties")) || [];

    const foundParty = storedParties.find(
      (p) => p.id.toString() === partyId
    );

    if (!foundParty) {
      navigate("/");
      return;
    }

    setPartyName(foundParty.name);

    // Dummy previous samples
    const dummySamples = [
      {
        id: 1,
        name: "Sample bs",
        date: "3/1/2026",
        tests: ["Proximate Analysis", "Ultimate Analysis", "GCV Test"]
      },
      {
        id: 2,
        name: "Coal Sample A",
        date: "01/02/2026",
        tests: ["Moisture Test", "Ash Content"]
      }
    ];

    setSamples(dummySamples);
  }, [partyId, navigate]);

  // Add Sample
  const addSample = () => {
    if (!sampleName.trim() || selectedTests.length === 0) {
      alert("Enter sample name and select tests");
      return;
    }

    const newSample = {
      id: Date.now(),
      name: sampleName,
      date: new Date().toLocaleDateString(),
      tests: selectedTests
    };

    setSamples([newSample, ...samples]);
    setSampleName("");
    setSelectedTests([]);
  };

  // Delete Sample
  const deleteSample = (id) => {
    setSamples(samples.filter((s) => s.id !== id));
  };

  // Search + Sort
  const filteredSamples = [...samples]
    .filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(search.toLowerCase());
      const bStarts = b.name.toLowerCase().startsWith(search.toLowerCase());

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });

  return (
    <div style={{ maxWidth: 1000, margin: "30px auto" }}>
      
      <button onClick={() => navigate("/")} style={{ marginBottom: 20 }}>
        ← Back
      </button>

      <h2>Samples for {partyName}</h2>

      {/* ADD SAMPLE */}
      <div style={{
        background: "white",
        padding: 20,
        marginTop: 20,
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        <h3>Add Sample</h3>

        <input
          placeholder="Sample Name"
          value={sampleName}
          onChange={(e) => setSampleName(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 15,
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
        />

        <div style={{ marginBottom: 10, fontWeight: 600 }}>
          Select Tests:
        </div>

        {testOptions.map((test) => (
          <div key={test}>
            <label>
              <input
                type="checkbox"
                value={test}
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
              {" "} {test}
            </label>
          </div>
        ))}

        <button
          onClick={addSample}
          style={{
            marginTop: 15,
            padding: "10px 18px",
            background: "#0b63d4",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          + Add Sample
        </button>
      </div>

      {/* PREVIOUS SAMPLES */}
      <div style={{
        background: "white",
        padding: 20,
        marginTop: 30,
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        <h3>Previous Samples</h3>

        <input
          placeholder="Search by sample name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 20,
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
        />

        {filteredSamples.length === 0 ? (
          <p>No samples found.</p>
        ) : (
          filteredSamples.map((sample) => (
            <div key={sample.id} style={{
              border: "1px solid #ddd",
              padding: 15,
              borderRadius: 8,
              marginBottom: 15,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#fafafa"
            }}>
              <div>
                <strong>{sample.name}</strong>
                <div>Date: {sample.date}</div>
                <div>Tests: {sample.tests.join(", ")}</div>
              </div>

              <button
                onClick={() => deleteSample(sample.id)}
                style={{
                  padding: "8px 14px",
                  background: "#d9534f",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}