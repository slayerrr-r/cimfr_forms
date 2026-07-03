export default function ProximateSection({ data, setData, editable = true }) {

  const handleChange = (basis, field, value) => {
    setData(prev => ({
      ...prev,
      proximate: {
        ...prev.proximate,
        [basis]: {
          ...prev.proximate[basis],
          [field]: value
        }
      }
    }));
  };

  const onInput = (basis, field) =>
    editable ? (value) => handleChange(basis, field, value) : undefined;

  return (

    <div className="table-responsive">

      <table className="table table-bordered align-middle">

        <thead className="table-light">

          <tr>
            <th style={{width: "30%"}}>Parameter</th>
            <th>Air Dry Basis (ADB)</th>
            <th>DMF Basis</th>
            <th>60% RH Basis</th>
          </tr>

        </thead>

        <tbody>

          <Row
            label="Moisture (%)"
            adb={data.proximate.adb.moisture}
            rh60={data.proximate.rh60.moisture}
            onADB={onInput("adb","moisture")}
            onRH={onInput("rh60","moisture")}
          />

          <Row
            label="Ash (%)"
            adb={data.proximate.adb.ash}
            rh60={data.proximate.rh60.ash}
            onADB={onInput("adb","ash")}
            onRH={onInput("rh60","ash")}
          />

          <Row
            label="Volatile Matter (%)"
            adb={data.proximate.adb.vm}
            dmf={data.proximate.dmf.vm}
            rh60={data.proximate.rh60.vm}
            onADB={onInput("adb","vm")}
            onDMF={onInput("dmf","vm")}
            onRH={onInput("rh60","vm")}
          />

          <Row
            label="Fixed Carbon (%)"
            adb={data.proximate.adb.fc}
            rh60={data.proximate.rh60.fc}
            onADB={onInput("adb","fc")}
            onRH={onInput("rh60","fc")}
          />

          <Row
            label="Gross Calorific Value (kcal/kg)"
            adb={data.proximate.adb.gcv}
            dmf={data.proximate.dmf.gcv}
            rh60={data.proximate.rh60.gcv}
            onADB={onInput("adb","gcv")}
            onDMF={onInput("dmf","gcv")}
            onRH={onInput("rh60","gcv")}
          />

        </tbody>

      </table>

    </div>
  );
}



function Row({ label, adb, dmf, rh60, onADB, onDMF, onRH }) {

  return (

    <tr>

      <td className="fw-semibold">
        {label}
      </td>

      <td>
        <input
          type="number"
          className="form-control form-control-sm"
          value={adb}
          onChange={onADB ? (e) => onADB(e.target.value) : undefined}
          disabled={!onADB}
        />
      </td>

      <td>
        <input
          type="number"
          className="form-control form-control-sm"
          value={dmf}
          onChange={onDMF ? (e) => onDMF(e.target.value) : undefined}
          disabled={!onDMF}
        />
      </td>

      <td>
        <input
          type="number"
          className="form-control form-control-sm"
          value={rh60}
          onChange={onRH ? (e) => onRH(e.target.value) : undefined}
          disabled={!onRH}
        />
      </td>

    </tr>

  );
}