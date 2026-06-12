export default function SampleMeta({ partyId, sampleId }) {
  return (
    <div
      style={{
        background: "white",
        padding: 20,
        marginTop: 20,
        borderRadius: 8,
        border: "1px solid #ddd"
      }}
    >
      <h3>Sample Information</h3>

      <div>Party ID: {partyId}</div>
      <div>Sample ID: {sampleId}</div>
    </div>
  );
}