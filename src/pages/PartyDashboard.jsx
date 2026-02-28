import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function PartyDashboard() {
  const navigate = useNavigate();

  const dummyParties = [
    { id: 1, name: "Adani Minerals", contact: "9876543210", email: "adani@gmail.com" },
    { id: 2, name: "Tata Steel", contact: "9123456780", email: "tata@gmail.com" },
    { id: 3, name: "Coal India Ltd", contact: "9988776655", email: "coal@gmail.com" },
    { id: 4, name: "Vedanta Ltd", contact: "9090909090", email: "vedanta@gmail.com" },
    { id: 5, name: "Hindustan Zinc", contact: "9111222333", email: "hzl@gmail.com" },
  ];

  const [parties, setParties] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  // LOAD DATA
  useEffect(() => {
    const saved = localStorage.getItem("parties");

    if (saved) {
      const parsed = JSON.parse(saved);

      if (parsed.length === 0) {
        setParties(dummyParties);
      } else {
        setParties(parsed);
      }
    } else {
      setParties(dummyParties);
    }
  }, []);

  // SAVE DATA
  useEffect(() => {
    localStorage.setItem("parties", JSON.stringify(parties));
  }, [parties]);

  const addParty = () => {
    if (!name.trim() || !contact.trim() || !email.trim()) {
      alert("Please fill all fields");
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
    if (!window.confirm("Delete this party?")) return;
    setParties(parties.filter((p) => p.id !== id));
  };

  const openPartyForm1 = (party) => {
  navigate(`/party/${party.id}`);
};
  // SORT
  const sortedParties = [...parties].sort((a, b) => {
    if (!search) return 0;

    const aStarts = a.name.toLowerCase().startsWith(search.toLowerCase());
    const bStarts = b.name.toLowerCase().startsWith(search.toLowerCase());

    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return 0;
  });

  // HIGHLIGHT
  const highlight = (text) => {
    if (!search) return text;

    const index = text.toLowerCase().indexOf(search.toLowerCase());
    if (index === -1) return text;

    return (
      <>
        {text.substring(0, index)}
        <span style={{ backgroundColor: "yellow" }}>
          {text.substring(index, index + search.length)}
        </span>
        {text.substring(index + search.length)}
      </>
    );
  };

  return (
    <div style={styles.wrapper}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <img src={logo} alt="logo" style={styles.logo} />
        <div>
          <div style={styles.hindi}>
            सी.एस.आई.आर. केन्द्रीय खनन एवं ईंधन अनुसंधान संस्थान, नागपुर
          </div>
          <div style={styles.eng}>
            CSIR - CENTRAL INSTITUTE OF MINING AND FUEL RESEARCH
          </div>
          <div style={styles.sub}>
            NAGPUR RESEARCH CENTRAL (FUEL SCIENCE)
          </div>
        </div>
      </div>

      <h1 style={styles.mainTitle}>Party Management</h1>
      <p style={styles.desc}>
        Add new parties and click on a party to open Form 1.
      </p>

      {/* ADD PARTY */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Add New Party</h3>

        <div style={styles.formRow}>
          <label style={styles.label}>Party Name</label>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter party name"
          />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Contact Number</label>
          <input
            style={styles.input}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter contact number"
          />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <button style={styles.addBtn} onClick={addParty}>
          + Add Party
        </button>
      </div>

      {/* SAVED PARTIES */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Saved Parties</h3>

        <input
          style={{ ...styles.input, marginBottom: 15 }}
          placeholder="Search by party name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {sortedParties.length === 0 ? (
          <p style={{ color: "#777" }}>No parties found.</p>
        ) : (
          sortedParties.map((party) => (
            <div key={party.id} style={styles.partyRow}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => openPartyForm1(party)}
              >
                <strong>{highlight(party.name)}</strong>
                <div style={{ fontSize: 13, color: "#555" }}>
                  📞 {party.contact} | ✉ {party.email}
                </div>
              </div>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteParty(party.id)}
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

const styles = {
  wrapper: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: 30,
    background: "#f9fafc",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    paddingBottom: 15,
    borderBottom: "2px solid #ddd",
    marginBottom: 30,
  },
  logo: { height: 80 },
  hindi: { fontWeight: 700, fontSize: 18 },
  eng: { fontWeight: 700, fontSize: 18 },
  sub: { fontSize: 14, color: "#444" },
  mainTitle: { marginBottom: 5 },
  desc: { marginBottom: 30, color: "#555" },
  card: {
    background: "white",
    padding: 25,
    borderRadius: 12,
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    marginBottom: 30,
  },
  cardTitle: { marginBottom: 20 },
  formRow: { display: "flex", flexDirection: "column", marginBottom: 18 },
  label: { marginBottom: 6, fontWeight: 600 },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  addBtn: {
    marginTop: 10,
    padding: "10px 18px",
    background: "#0b63d4",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontWeight: 600,
    cursor: "pointer",
  },
  partyRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    border: "1px solid #ddd",
    borderRadius: 8,
    marginBottom: 10,
    background: "#fafafa",
  },
  deleteBtn: {
    padding: "6px 12px",
    background: "#d9534f",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};