import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PartyDashboard() {

  const navigate = useNavigate();

  const DUMMY_PARTIES = [
    { id: 1, name: "Adani Minerals", contact: "9876543210", email: "adani@gmail.com" },
    { id: 2, name: "Tata Steel", contact: "9123456780", email: "tata@gmail.com" },
    { id: 3, name: "Coal India Ltd", contact: "9988776655", email: "coal@gmail.com" },
    { id: 4, name: "Vedanta Ltd", contact: "9090909090", email: "vedanta@gmail.com" },
    { id: 5, name: "Hindustan Zinc", contact: "9111222333", email: "hzl@gmail.com" },
  ];

  const [parties, setParties] = useState(() => {
    const saved = localStorage.getItem("parties");
    if (!saved) return DUMMY_PARTIES;

    try {
      const parsed = JSON.parse(saved);
      return parsed.length ? parsed : DUMMY_PARTIES;
    } catch {
      return DUMMY_PARTIES;
    }
  });

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  React.useEffect(() => {
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

  const openPartySamples = (party) => {
    navigate(`/party/${party.id}`);
  };

  const filteredParties = parties.filter((party) =>
    party.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="container-fluid">

      {/* PAGE HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Party Management
          </h2>

          <p className="text-muted mb-0">
            Manage laboratory clients and their sample records
          </p>
        </div>

      </div>



      {/* ADD PARTY */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body">

          <h5 className="fw-semibold mb-3">
            Add New Party
          </h5>

          <div className="row g-3">

            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Party Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

          </div>

          <button
            className="btn btn-primary mt-3"
            onClick={addParty}
          >
            + Add Party
          </button>

        </div>

      </div>



      {/* PARTY LIST */}

      <div className="card shadow-sm border-0">

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="fw-semibold mb-0">
              Registered Parties
            </h5>

            <input
              className="form-control"
              style={{ maxWidth: 260 }}
              placeholder="Search party..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr>
                  <th>Party Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th width="160">Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredParties.length === 0 && (

                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No matching parties found
                    </td>
                  </tr>

                )}

                {filteredParties.map((party) => (

                  <tr key={party.id}>

                    <td
                      style={{ cursor: "pointer", fontWeight: "500" }}
                      onClick={() => openPartySamples(party)}
                    >
                      {party.name}
                    </td>

                    <td>{party.contact}</td>

                    <td>{party.email}</td>

                    <td>

                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => openPartySamples(party)}
                      >
                        Open
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteParty(party.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}