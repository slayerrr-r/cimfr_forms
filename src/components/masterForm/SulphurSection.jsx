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

    <div className="table-responsive">

      <table className="table table-bordered align-middle">

        <thead className="table-light">

          <tr>
            <th style={{ width: "40%" }}>Type</th>
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

      <td className="fw-semibold">
        {label}
      </td>

      <td>
        <input
          type="number"
          className="form-control form-control-sm"
          value={coal}
          onChange={(e)=>onCoal(e.target.value)}
        />
      </td>

      <td>
        <input
          type="number"
          className="form-control form-control-sm"
          value={sulphur}
          onChange={(e)=>onSulphur(e.target.value)}
        />
      </td>

    </tr>

  );
}