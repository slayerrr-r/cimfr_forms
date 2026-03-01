export default function UltimateSection({ data, setData }) {

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
      <h2>2. Ultimate Analysis</h2>

      <table style={{ minWidth: 700, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Element (%)</th>
            <th>Air Dry Basis</th>
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
            onADB={v=>handleChange("adb","c",v)}
            onDMF={v=>handleChange("dmf","c",v)}
            onRH={v=>handleChange("rh60","c",v)}
          />

          <Row
            label="Hydrogen (H)"
            adb={data.ultimate.adb.h}
            dmf={data.ultimate.dmf.h}
            rh60={data.ultimate.rh60.h}
            onADB={v=>handleChange("adb","h",v)}
            onDMF={v=>handleChange("dmf","h",v)}
            onRH={v=>handleChange("rh60","h",v)}
          />

          <Row
            label="Nitrogen (N)"
            adb={data.ultimate.adb.n}
            dmf={data.ultimate.dmf.n}
            rh60={data.ultimate.rh60.n}
            onADB={v=>handleChange("adb","n",v)}
            onDMF={v=>handleChange("dmf","n",v)}
            onRH={v=>handleChange("rh60","n",v)}
          />

          <Row
            label="Sulphur (S)"
            adb={data.ultimate.adb.s}
            dmf={data.ultimate.dmf.s}
            rh60={data.ultimate.rh60.s}
            onADB={v=>handleChange("adb","s",v)}
            onDMF={v=>handleChange("dmf","s",v)}
            onRH={v=>handleChange("rh60","s",v)}
          />

          <Row
            label="Oxygen (O)"
            adb={data.ultimate.adb.o}
            rh60={data.ultimate.rh60.o}
            onADB={v=>handleChange("adb","o",v)}
            onRH={v=>handleChange("rh60","o",v)}
          />

        </tbody>
      </table>
    </div>
  );
}

function Row({ label, adb, dmf, rh60, onADB, onDMF, onRH }) {
  return (
    <tr>
      <td>{label}</td>

      <td>
        {onADB && (
          <input type="number" value={adb} onChange={e=>onADB(e.target.value)} />
        )}
      </td>

      <td>
        {onDMF && (
          <input type="number" value={dmf} onChange={e=>onDMF(e.target.value)} />
        )}
      </td>

      <td>
        {onRH && (
          <input type="number" value={rh60} onChange={e=>onRH(e.target.value)} />
        )}
      </td>
    </tr>
  );
}