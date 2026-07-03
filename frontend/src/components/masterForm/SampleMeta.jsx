export default function SampleMeta({ partyId, sampleId, partyName, sampleName }) {
  return (
    <div
      className="p-3 bg-light rounded border mb-3"
      style={{
        marginTop: 15
      }}
    >
      <div className="row g-3">
        <div className="col-sm-6">
          <span className="text-muted d-block small uppercase fw-semibold">Party Name</span>
          <span className="fw-semibold text-dark fs-6">{partyName || "Loading..."}</span>
          <span className="text-muted small d-block">ID: {partyId}</span>
        </div>
        <div className="col-sm-6">
          <span className="text-muted d-block small uppercase fw-semibold">Sample Name</span>
          <span className="fw-semibold text-dark fs-6">{sampleName || "Loading..."}</span>
          <span className="text-muted small d-block">ID: {sampleId}</span>
        </div>
      </div>
    </div>
  );
}