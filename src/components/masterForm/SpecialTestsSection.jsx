export default function SpecialTestsSection({ data, setData }) {

  const updateAshFusion = (field, value) => {
    setData(prev => ({
      ...prev,
      ashFusion: {
        ...prev.ashFusion,
        [field]: value
      }
    }));
  };

  const updateElemental = (field, value) => {
    setData(prev => ({
      ...prev,
      elemental: {
        ...prev.elemental,
        [field]: value
      }
    }));
  };

  const updateOther = (field, value) => {
    setData(prev => ({
      ...prev,
      otherTests: {
        ...prev.otherTests,
        [field]: value
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
      <h2>3. Special Tests</h2>

      {/* ================= Ash Fusion ================= */}
      <h3>Ash Fusion Temperature (°C)</h3>
      <table style={{ minWidth: 400 }}>
        <tbody>
          <Row label="IDT" value={data.ashFusion.idt} onChange={v=>updateAshFusion("idt",v)} />
          <Row label="ST" value={data.ashFusion.st} onChange={v=>updateAshFusion("st",v)} />
          <Row label="HT" value={data.ashFusion.ht} onChange={v=>updateAshFusion("ht",v)} />
          <Row label="FT" value={data.ashFusion.ft} onChange={v=>updateAshFusion("ft",v)} />
        </tbody>
      </table>

      {/* ================= Elemental ================= */}
      <h3 style={{ marginTop: 30 }}>Elemental Composition (%)</h3>
      <table style={{ minWidth: 400 }}>
        <tbody>
          <Row label="SiO₂" value={data.elemental.sio2} onChange={v=>updateElemental("sio2",v)} />
          <Row label="Al₂O₃" value={data.elemental.al2o3} onChange={v=>updateElemental("al2o3",v)} />
          <Row label="Fe₂O₃" value={data.elemental.fe2o3} onChange={v=>updateElemental("fe2o3",v)} />
          <Row label="CaO" value={data.elemental.cao} onChange={v=>updateElemental("cao",v)} />
          <Row label="MgO" value={data.elemental.mgo} onChange={v=>updateElemental("mgo",v)} />
          <Row label="Na₂O" value={data.elemental.na2o} onChange={v=>updateElemental("na2o",v)} />
          <Row label="K₂O" value={data.elemental.k2o} onChange={v=>updateElemental("k2o",v)} />
          <Row label="TiO₂" value={data.elemental.tio2} onChange={v=>updateElemental("tio2",v)} />
          <Row label="P₂O₅" value={data.elemental.p2o5} onChange={v=>updateElemental("p2o5",v)} />
          <Row label="SO₃" value={data.elemental.so3} onChange={v=>updateElemental("so3",v)} />
        </tbody>
      </table>

      {/* ================= Other ================= */}
      <h3 style={{ marginTop: 30 }}>Other Parameters</h3>
      <table style={{ minWidth: 400 }}>
        <tbody>
          <Row label="HGI" value={data.otherTests.hgi} onChange={v=>updateOther("hgi",v)} />
          <Row label="Swelling Index" value={data.otherTests.swellingIndex} onChange={v=>updateOther("swellingIndex",v)} />
          <Row label="LTKG Coke Type" value={data.otherTests.cokeType} onChange={v=>updateOther("cokeType",v)} />
        </tbody>
      </table>

    </div>
  );
}

function Row({ label, value, onChange }) {
  return (
    <tr>
      <td style={{ paddingRight: 20 }}>{label}</td>
      <td>
        <input
          type="number"
          value={value}
          onChange={(e)=>onChange(e.target.value)}
        />
      </td>
    </tr>
  );
}   