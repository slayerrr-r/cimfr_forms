import React, { useEffect, useState } from "react";
import { api } from "../services/api";

function formatDateTime(value) {
  if (!value) return "";
  return new Date(value).toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({
    totalParties: 0,
    totalSamples: 0,
    pendingSamples: 0,
    completedSamples: 0,
    todaysReports: 0,
    latestActivity: [],
  });

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError(null);

      try {
        const parties = await api.getParties();
        const samplesByParty = await Promise.all(
          parties.map(async (party) => {
            const samples = await api.getSamples(party.id);
            return samples.map((sample) => ({ ...sample, partyName: party.name }));
          })
        );

        const samples = samplesByParty.flat();
        const totalParties = parties.length;
        const totalSamples = samples.length;
        const today = new Date().toISOString().slice(0, 10);

        const pendingSamples = samples.filter(
          (sample) => sample.status && sample.status !== "Waiting for Admin"
        ).length;

        const completedSamples = samples.filter(
          (sample) => sample.status === "Waiting for Admin"
        ).length;

        const todaysReports = samples.filter(
          (sample) => sample.date === today
        ).length;

        const activities = [
          ...parties.map((party) => ({
            id: `party-${party.id}`,
            title: `Party created: ${party.name}`,
            subtitle: "Party record",
            timestamp: party.updated_at || party.created_at,
            description: `Party contact: ${party.contact}`,
          })),
          ...samples.map((sample) => ({
            id: `sample-${sample.id}`,
            title: `Sample updated: ${sample.name}`,
            subtitle: sample.partyName,
            timestamp: sample.updated_at || sample.created_at,
            description: `Status: ${sample.status || "Unknown"}`,
          })),
        ];

        activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setSummary({
          totalParties,
          totalSamples,
          pendingSamples,
          completedSamples,
          todaysReports,
          latestActivity: activities.slice(0, 5),
        });
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Admin Dashboard</h2>
          <p className="text-muted mb-0">Overview of parties, samples, and latest activity.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading dashboard...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      ) : (
        <>
          <div className="row g-3 mb-4">
            <MetricCard label="Total Parties" value={summary.totalParties} icon="👥" />
            <MetricCard label="Total Samples" value={summary.totalSamples} icon="🧪" />
            <MetricCard label="Pending Samples" value={summary.pendingSamples} icon="⏳" />
            <MetricCard label="Completed Samples" value={summary.completedSamples} icon="✅" />
            <MetricCard label="Today's Reports" value={summary.todaysReports} icon="📄" />
          </div>

          <div className="row">
            <div className="col-lg-8 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h5 className="fw-semibold mb-1">Latest Activity</h5>
                      <p className="text-muted mb-0">Recent updates from parties and sample workflows.</p>
                    </div>
                    <span className="badge bg-info text-dark">Live</span>
                  </div>

                  <div className="list-group">
                    {summary.latestActivity.length === 0 ? (
                      <div className="text-center text-muted py-4">No activity available</div>
                    ) : (
                      summary.latestActivity.map((item) => (
                        <div key={item.id} className="list-group-item border-0 px-0 py-3">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <div className="fw-semibold">{item.title}</div>
                              <div className="text-muted small">{item.subtitle}</div>
                            </div>
                            <div className="text-muted small">{formatDateTime(item.timestamp)}</div>
                          </div>
                          <div className="text-muted small mt-2">{item.description}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="fw-semibold mb-3">Quick Insights</h5>
                  <div className="d-grid gap-3">
                    <InsightItem label="High load" value={`${summary.totalSamples} samples`} />
                    <InsightItem label="Workflow progress" value={`${summary.completedSamples} completed`} />
                    <InsightItem label="Active parties" value={`${summary.totalParties} parties`} />
                    <InsightItem label="Pending review" value={`${summary.pendingSamples} samples`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function MetricCard({ label, value, icon }) {
  return (
    <div className="col-sm-6 col-xl-4">
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body d-flex align-items-center gap-3">
          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: 56, height: 56 }}>
            <span style={{ fontSize: 22 }}>{icon}</span>
          </div>
          <div>
            <div className="small text-uppercase text-muted">{label}</div>
            <div className="h4 mb-0">{value}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightItem({ label, value }) {
  return (
    <div className="p-3 rounded-3 border border-1 border-light bg-white">
      <div className="small text-muted mb-1">{label}</div>
      <div className="fw-semibold">{value}</div>
    </div>
  );
}
