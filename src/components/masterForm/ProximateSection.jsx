export default function ProximateSection({ data, setData }) {

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
      <h2>1. Proximate Analysis</h2>

      <table style={{ minWidth: 700, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Air Dry Basis</th>
            <th>DMF Basis</th>
            <th>60% RH Basis</th>
          </tr>
        </thead>

        <tbody>

          <Row
            label="Moisture (%)"
            adb={data.proximate.adb.moisture}
            rh60={data.proximate.rh60.moisture}
            onADB={v=>handleChange("adb","moisture",v)}
            onRH={v=>handleChange("rh60","moisture",v)}
          />

          <Row
            label="Ash (%)"
            adb={data.proximate.adb.ash}
            rh60={data.proximate.rh60.ash}
            onADB={v=>handleChange("adb","ash",v)}
            onRH={v=>handleChange("rh60","ash",v)}
          />

          <Row
            label="VM (%)"
            adb={data.proximate.adb.vm}
            dmf={data.proximate.dmf.vm}
            rh60={data.proximate.rh60.vm}
            onADB={v=>handleChange("adb","vm",v)}
            onDMF={v=>handleChange("dmf","vm",v)}
            onRH={v=>handleChange("rh60","vm",v)}
          />

          <Row
            label="FC (%)"
            adb={data.proximate.adb.fc}
            rh60={data.proximate.rh60.fc}
            onADB={v=>handleChange("adb","fc",v)}
            onRH={v=>handleChange("rh60","fc",v)}
          />

          <Row
            label="GCV (kcal)"
            adb={data.proximate.adb.gcv}
            dmf={data.proximate.dmf.gcv}
            rh60={data.proximate.rh60.gcv}
            onADB={v=>handleChange("adb","gcv",v)}
            onDMF={v=>handleChange("dmf","gcv",v)}
            onRH={v=>handleChange("rh60","gcv",v)}
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