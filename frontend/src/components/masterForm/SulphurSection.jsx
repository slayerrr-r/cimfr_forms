export default function SulphurSection({ data, setData, editable = true }) {

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

  const onInput = (type, field) =>
    editable ? (value) => handleChange(type, field, value) : undefined;

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
            onCoal={onInput("pyritic","coal")}
            onSulphur={onInput("pyritic","sulphur")}
          />

          <Row
            label="Sulphate S"
            coal={data.sulphur.sulphate.coal}
            sulphur={data.sulphur.sulphate.sulphur}
            onCoal={onInput("sulphate","coal")}
            onSulphur={onInput("sulphate","sulphur")}
          />

          <Row
            label="Organic S"
            coal={data.sulphur.organic.coal}
            sulphur={data.sulphur.organic.sulphur}
            onCoal={onInput("organic","coal")}
            onSulphur={onInput("organic","sulphur")}
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
          onChange={onCoal ? (e) => onCoal(e.target.value) : undefined}
          disabled={!onCoal}
        />
      </td>

      <td>
        <input
          type="number"
          className="form-control form-control-sm"
          value={sulphur}
          onChange={onSulphur ? (e) => onSulphur(e.target.value) : undefined}
          disabled={!onSulphur}
        />
      </td>

    </tr>

  );
}