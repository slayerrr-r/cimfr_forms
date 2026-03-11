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

  const saveForm = () => {

    localStorage.setItem(
      `form_${partyId}_${sampleId}`,
      JSON.stringify(sampleData)
    );

    alert("Form saved successfully");

  };

  return (

    <div className="container-fluid py-4">

      {/* PAGE HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Master Analysis Form
          </h2>

          <p className="text-muted mb-0">
            Sample ID: <strong>{sampleId}</strong>
          </p>
        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

      </div>

      <div className="row">

        {/* LEFT NAVIGATION */}

        <div className="col-md-3">

          <div className="card shadow-sm border-0 position-sticky" style={{top:20}}>

            <div className="card-body">

              <h6 className="fw-bold mb-3">
                Analysis Sections
              </h6>

              <div className="list-group">

                <a href="#proximate" className="list-group-item list-group-item-action">
                  Proximate Analysis
                </a>

                <a href="#ultimate" className="list-group-item list-group-item-action">
                  Ultimate Analysis
                </a>

                <a href="#special" className="list-group-item list-group-item-action">
                  Special Tests
                </a>

                <a href="#sulphur" className="list-group-item list-group-item-action">
                  Sulphur Distribution
                </a>

              </div>

            </div>

          </div>

        </div>


        {/* MAIN FORM */}

        <div className="col-md-9">

          {/* SAMPLE INFO */}

          <div className="card shadow-sm border-0 mb-4">

            <div className="card-body">

              <h5 className="fw-semibold mb-3">
                Sample Information
              </h5>

              <SampleMeta partyId={partyId} sampleId={sampleId} />

            </div>

          </div>


          {/* PROXIMATE */}

          <div id="proximate" className="card shadow-sm border-0 mb-4">

            <div className="card-body">

              <h5 className="fw-bold text-primary mb-3">
                1. Proximate Analysis
              </h5>

              <ProximateSection
                data={sampleData}
                setData={setSampleData}
              />

            </div>

          </div>


          {/* ULTIMATE */}

          <div id="ultimate" className="card shadow-sm border-0 mb-4">

            <div className="card-body">

              <h5 className="fw-bold text-primary mb-3">
                2. Ultimate Analysis
              </h5>

              <UltimateSection
                data={sampleData}
                setData={setSampleData}
              />

            </div>

          </div>


          {/* SPECIAL */}

          <div id="special" className="card shadow-sm border-0 mb-4">

            <div className="card-body">

              <h5 className="fw-bold text-primary mb-3">
                3. Special Tests
              </h5>

              <SpecialTestsSection
                data={sampleData}
                setData={setSampleData}
              />

            </div>

          </div>


          {/* SULPHUR */}

          <div id="sulphur" className="card shadow-sm border-0 mb-4">

            <div className="card-body">

              <h5 className="fw-bold text-primary mb-3">
                4. Distribution of Sulphur
              </h5>

              <SulphurSection
                data={sampleData}
                setData={setSampleData}
              />

            </div>

          </div>


          {/* SAVE BUTTON */}

          <div className="text-end">

            <button
              className="btn btn-primary px-4 py-2"
              onClick={saveForm}
            >
              Save Analysis Form
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}