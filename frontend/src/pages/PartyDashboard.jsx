import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function PartyDashboard() {

  const navigate = useNavigate();

  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");

  const fetchParties = async (query = "") => {
    try {
      setLoading(true);
      const data = await api.getParties(query);
      setParties(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load parties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParties(search);
  }, [search]);

  const addParty = async () => {

    if (!name.trim() || !contact.trim() || !email.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.createParty({ name, contact, email });
      setName("");
      setContact("");
      setEmail("");
      await fetchParties(search);
    } catch (err) {
      alert(err.message || "Failed to add party");
    }
  };

  const deleteParty = async (id) => {

    if (!window.confirm("Delete this party?")) return;

    try {
      await api.deleteParty(id);
      await fetchParties(search);
    } catch (err) {
      alert(err.message || "Failed to delete party");
    }
  };

  const openPartySamples = (party) => {
    navigate(`/party/${party.id}`);
  };

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

                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                      Loading registered parties...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="4" className="text-center text-danger py-4">
                      Error loading parties: {error}
                    </td>
                  </tr>
                ) : parties.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      No matching parties found
                    </td>
                  </tr>
                ) : (
                  parties.map((party) => (
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
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}