export default function SulphurSection({ data, setData }) {

  const handleChange = (type, field, value) => {
    setData(prev => ({
      ...prev,
      sulphur: {
        ...prev.sulphur,
        [type]: {
          ...prev.sulphur[type],
          [field]: value
        }
      }
    }));
  };

  return (
    <div
      style={{
        background: "white",
        padding: 20,
        marginTop: 30,
        borderRadius: 8,
        border: "1px solid #ddd",
        overflowX: "auto"
      }}
    >
      <h2>4. Distribution of Sulphur</h2>

      <table style={{ minWidth: 500, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Coal Basis (%)</th>
            <th>Sulphur Basis (%)</th>
          </tr>
        </thead>

        <tbody>

          <Row
            label="Pyritic S"
            coal={data.sulphur.pyritic.coal}
            sulphur={data.sulphur.pyritic.sulphur}
            onCoal={v=>handleChange("pyritic","coal",v)}
            onSulphur={v=>handleChange("pyritic","sulphur",v)}
          />

          <Row
            label="Sulphate S"
            coal={data.sulphur.sulphate.coal}
            sulphur={data.sulphur.sulphate.sulphur}
            onCoal={v=>handleChange("sulphate","coal",v)}
            onSulphur={v=>handleChange("sulphate","sulphur",v)}
          />

          <Row
            label="Organic S"
            coal={data.sulphur.organic.coal}
            sulphur={data.sulphur.organic.sulphur}
            onCoal={v=>handleChange("organic","coal",v)}
            onSulphur={v=>handleChange("organic","sulphur",v)}
          />

        </tbody>
      </table>
    </div>
  );
}

function Row({ label, coal, sulphur, onCoal, onSulphur }) {
  return (
    <tr>
      <td>{label}</td>

      <td>
        <input
          type="number"
          value={coal}
          onChange={(e)=>onCoal(e.target.value)}
        />
      </td>

      <td>
        <input
          type="number"
          value={sulphur}
          onChange={(e)=>onSulphur(e.target.value)}
        />
      </td>
    </tr>
  );
}