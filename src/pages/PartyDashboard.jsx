import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PartyDashboard() {
  const navigate = useNavigate();

  const [parties, setParties] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  // Load saved parties on page load
  useEffect(() => {
    const saved = localStorage.getItem("parties");
    if (saved) setParties(JSON.parse(saved));
  }, []);

  // Save parties whenever updated
  useEffect(() => {
    localStorage.setItem("parties", JSON.stringify(parties));
  }, [parties]);

  const addParty = () => {
    if (!name.trim() || !contact.trim() || !email.trim()) {
      alert("Please fill Name, Contact, Email");
      return;
    }

    const newParty = {
      id: Date.now(),
      name,
      contact,
      email,
    };

    setParties([newParty, ...parties]);
    setName("");
    setContact("");
    setEmail("");
  };

  const deleteParty = (id) => {
    const ok = confirm("Delete this party?");
    if (!ok) return;
    setParties(parties.filter((p) => p.id !== id));
  };

  const openPartyForm1 = (party) => {
    // pass party id in URL
    navigate(`/form1/${party.id}`);
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Party Management</h2>
      <p style={styles.subTitle}>
        Add Parties and click a party to open Form 1 for that party.
      </p>

      {/* ADD PARTY FORM */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: 10 }}>Add New Party</h3>

        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Party Name</label>
            <input
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter party name"
            />
          </div>

          <div>
            <label style={styles.label}>Contact No.</label>
            <input
              style={styles.input}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter contact number"
            />
          </div>

          <div>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
        </div>

        <button style={styles.btn} onClick={addParty}>
          + Add Party
        </button>
      </div>

      {/* PARTY LIST */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: 10 }}>Saved Parties</h3>

        {parties.length === 0 ? (
          <p style={{ color: "#666" }}>No parties added yet.</p>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {parties.map((party) => (
              <div key={party.id} style={styles.partyRow}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => openPartyForm1(party)}
                >
                  <div style={{ fontWeight: 700 }}>{party.name}</div>
                  <div style={{ fontSize: 13, color: "#444" }}>
                    📞 {party.contact} | ✉️ {party.email}
                  </div>
                </div>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteParty(party.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 900,
    margin: "0 auto",
    padding: 20,
  },
  title: {
    marginBottom: 5,
  },
  subTitle: {
    marginBottom: 20,
    color: "#555",
  },
  card: {
    background: "white",
    border: "1px solid #ddd",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 12,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    display: "block",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "9px 10px",
    borderRadius: 8,
    border: "1px solid #bbb",
    outline: "none",
  },
  btn: {
    padding: "10px 14px",
    border: "none",
    borderRadius: 8,
    background: "#0b63d4",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
  partyRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ddd",
    padding: "10px 12px",
    borderRadius: 10,
    background: "#fafafa",
  },
  deleteBtn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: 8,
    background: "#d9534f",
    color: "white",
    cursor: "pointer",
  },
};
