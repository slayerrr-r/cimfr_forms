import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import SampleMeta from "../components/masterForm/SampleMeta";
import ProximateSection from "../components/masterForm/ProximateSection";
import UltimateSection from "../components/masterForm/UltimateSection";
import SpecialTestsSection from "../components/masterForm/SpecialTestsSection";
import SulphurSection from "../components/masterForm/SulphurSection";

export default function MasterForm() {
  const { partyId, sampleId } = useParams();
  const navigate = useNavigate();

  // MASTER FORM STATE (entire form stored here)
  const [sampleData, setSampleData] = useState({

    proximate: {
      adb: { moisture:"", ash:"", vm:"", fc:"", gcv:"" },
      dmf: { vm:"", gcv:"" },
      rh60:{ moisture:"", ash:"", vm:"", fc:"", gcv:"" }
    },

    ultimate: {
      adb:{ c:"", h:"", n:"", s:"", o:"" },
      dmf:{ c:"", h:"", n:"", s:"" },
      rh60:{ c:"", h:"", n:"", s:"", o:"" }
    },

    ashFusion:{ idt:"", st:"", ht:"", ft:"" },

    elemental:{
      sio2:"", al2o3:"", fe2o3:"", cao:"",
      mgo:"", na2o:"", k2o:"", tio2:"",
      p2o5:"", so3:""
    },

    otherTests:{
      hgi:"",
      swellingIndex:"",
      cokeType:""
    },

    sulphur:{
      pyritic:{ coal:"", sulphur:"" },
      sulphate:{ coal:"", sulphur:"" },
      organic:{ coal:"", sulphur:"" }
    }

  });

  // TEMP SAVE (localStorage)
  const saveForm = () => {
    localStorage.setItem(
      `form_${partyId}_${sampleId}`,
      JSON.stringify(sampleData)
    );
    alert("Form saved");
  };

  return (
    <div style={{ padding: 30, maxWidth: 1200, margin: "0 auto" }}>

      <button onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        ← Back
      </button>

      <h1>Master Analysis Form</h1>

      <SampleMeta partyId={partyId} sampleId={sampleId} />

      <ProximateSection
        data={sampleData}
        setData={setSampleData}
      />

      <UltimateSection
        data={sampleData}
        setData={setSampleData}
      />

      <SpecialTestsSection
        data={sampleData}
        setData={setSampleData}
      />

      <SulphurSection
        data={sampleData}
        setData={setSampleData}
      />

      <button
        onClick={saveForm}
        style={{
          marginTop: 30,
          padding: "12px 20px",
          background: "#0b63d4",
          color: "white",
          border: "none",
          borderRadius: 6
        }}
      >
        Save Form
      </button>

    </div>
  );
}