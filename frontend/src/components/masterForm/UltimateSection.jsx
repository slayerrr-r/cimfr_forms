export default function UltimateSection({ data, setData, editable = true }) {

  const handleChange = (basis, field, value) => {
    setData(prev => ({
      ...prev,
      ultimate: {
        ...prev.ultimate,
        [basis]: {
          ...prev.ultimate[basis],
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
            <th style={{ width: "30%" }}>Element (%)</th>
            <th>Air Dry Basis (ADB)</th>
            <th>DMF Basis</th>
            <th>60% RH Basis</th>
          </tr>

        </thead>

        <tbody>

          <Row
            label="Carbon (C)"
            adb={data.ultimate.adb.c}
            dmf={data.ultimate.dmf.c}
            rh60={data.ultimate.rh60.c}
            onADB={onInput("adb","c")}
            onDMF={onInput("dmf","c")}
            onRH={onInput("rh60","c")}
          />

          <Row
            label="Hydrogen (H)"
            adb={data.ultimate.adb.h}
            dmf={data.ultimate.dmf.h}
            rh60={data.ultimate.rh60.h}
            onADB={onInput("adb","h")}
            onDMF={onInput("dmf","h")}
            onRH={onInput("rh60","h")}
          />

          <Row
            label="Nitrogen (N)"
            adb={data.ultimate.adb.n}
            dmf={data.ultimate.dmf.n}
            rh60={data.ultimate.rh60.n}
            onADB={onInput("adb","n")}
            onDMF={onInput("dmf","n")}
            onRH={onInput("rh60","n")}
          />

          <Row
            label="Sulphur (S)"
            adb={data.ultimate.adb.s}
            dmf={data.ultimate.dmf.s}
            rh60={data.ultimate.rh60.s}
            onADB={onInput("adb","s")}
            onDMF={onInput("dmf","s")}
            onRH={onInput("rh60","s")}
          />

          <Row
            label="Oxygen (O)"
            adb={data.ultimate.adb.o}
            rh60={data.ultimate.rh60.o}
            onADB={onInput("adb","o")}
            onRH={onInput("rh60","o")}
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