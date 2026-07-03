import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { jsPDF } from "jspdf";

import SampleMeta from "../components/masterForm/SampleMeta";
import ProximateSection from "../components/masterForm/ProximateSection";
import UltimateSection from "../components/masterForm/UltimateSection";
import SpecialTestsSection from "../components/masterForm/SpecialTestsSection";
import SulphurSection from "../components/masterForm/SulphurSection";
import { api } from "../services/api";

const DEFAULT_TEMPLATE = {
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
};

function deepMerge(target, source) {
  if (!source || typeof source !== "object") return target;
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object") {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

export default function MasterForm() {

  const { partyId, sampleId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const roleParam = searchParams.get("role")?.trim().toUpperCase();
  const role = ["ADMIN", "S1", "S2", "S3"].includes(roleParam) ? roleParam : "ADMIN";
  const isAdmin = role === "ADMIN";
  const canEditProximate = isAdmin || role === "S1";
  const canEditUltimate = isAdmin || role === "S2";
  const canEditSpecial = isAdmin || role === "S3";
  const canEditSulphur = isAdmin;

  const [sampleData, setSampleData] = useState(DEFAULT_TEMPLATE);
  const [partyName, setPartyName] = useState("");
  const [sampleName, setSampleName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFormDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch sample info
      const sampleInfo = await api.getSample(sampleId);
      setSampleName(sampleInfo.name);

      // Fetch party info
      const partyInfo = await api.getParty(partyId);
      setPartyName(partyInfo.name);

      // Fetch analysis record
      const analysisData = await api.getAnalysis(sampleId);
      setSampleData(deepMerge(DEFAULT_TEMPLATE, analysisData || {}));
    } catch (err) {
      setError(err.message || "Failed to load form details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormDetails();
  }, [partyId, sampleId]);

  const saveForm = async () => {
    try {
      await api.saveAnalysis(sampleId, sampleData, role);
      alert("Form saved successfully");
    } catch (err) {
      alert(err.message || "Failed to save analysis form");
    }
  };

  const generateReportPdf = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 40;
    const lineHeight = 18;
    let y = margin;

    const drawHeader = () => {
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Official Laboratory Report", 210, y, { align: "center" });
      y += lineHeight * 1.5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("CIMFR Coal and Materials Testing Laboratory", 210, y, { align: "center" });
      y += lineHeight * 2;
      doc.setLineWidth(1);
      doc.line(margin, y, 595 - margin, y);
      y += lineHeight;
    };

    const drawSection = (title) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(title, margin, y);
      y += lineHeight * 1.2;
      doc.setFont("helvetica", "normal");
    };

    const drawKeyValue = (label, value) => {
      doc.setFontSize(10);
      doc.text(`${label}:`, margin, y);
      doc.text(`${value || "-"}`, margin + 150, y);
      y += lineHeight;
    };

    const drawTableRow = (cells, widths) => {
      let x = margin;
      cells.forEach((cell, index) => {
        doc.text(String(cell), x + 2, y);
        x += widths[index];
      });
      y += lineHeight;
    };

    const ensurePage = () => {
      if (y > 760) {
        doc.addPage();
        y = margin;
      }
    };

    drawHeader();

    drawSection("Party Information");
    drawKeyValue("Party Name", partyName);
    drawKeyValue("Party ID", partyId);
    drawKeyValue("Analyst", role);
    y += lineHeight / 2;
    doc.setLineWidth(0.5);
    doc.line(margin, y, 595 - margin, y);
    y += lineHeight;

    drawSection("Sample Information");
    drawKeyValue("Sample Name", sampleName);
    drawKeyValue("Sample ID", sampleId);
    drawKeyValue("Report Date", new Date().toLocaleDateString());
    y += lineHeight / 2;
    doc.line(margin, y, 595 - margin, y);
    y += lineHeight;

    ensurePage();
    drawSection("Calculated Proximate Values");
    const proximateHeaders = ["Basis", "Moisture", "Ash", "VM", "FC", "GCV"];
    const proximateWidths = [90, 90, 70, 70, 70, 90];
    doc.setFont("helvetica", "bold");
    drawTableRow(proximateHeaders, proximateWidths);
    doc.setFont("helvetica", "normal");
    ["adb", "rh60", "dmf"].forEach((basis) => {
      drawTableRow([
        basis.toUpperCase(),
        sampleData.proximate?.[basis]?.moisture || "",
        sampleData.proximate?.[basis]?.ash || "",
        sampleData.proximate?.[basis]?.vm || "",
        sampleData.proximate?.[basis]?.fc || "",
        sampleData.proximate?.[basis]?.gcv || "",
      ], proximateWidths);
    });

    y += lineHeight / 2;
    doc.line(margin, y, 595 - margin, y);
    y += lineHeight;

    ensurePage();
    drawSection("Calculated Ultimate Values");
    const ultimateHeaders = ["Basis", "C", "H", "N", "S", "O"];
    const ultimateWidths = [90, 90, 90, 90, 90, 90];
    doc.setFont("helvetica", "bold");
    drawTableRow(ultimateHeaders, ultimateWidths);
    doc.setFont("helvetica", "normal");
    ["adb", "rh60", "dmf"].forEach((basis) => {
      drawTableRow([
        basis.toUpperCase(),
        sampleData.ultimate?.[basis]?.c || "",
        sampleData.ultimate?.[basis]?.h || "",
        sampleData.ultimate?.[basis]?.n || "",
        sampleData.ultimate?.[basis]?.s || "",
        sampleData.ultimate?.[basis]?.o || "",
      ], ultimateWidths);
    });

    y += lineHeight / 2;
    doc.line(margin, y, 595 - margin, y);
    y += lineHeight;

    ensurePage();
    drawSection("Special Tests & Elemental Analysis");
    drawKeyValue("HGI", sampleData.otherTests?.hgi);
    drawKeyValue("Swelling Index", sampleData.otherTests?.swellingIndex);
    drawKeyValue("Coke Type", sampleData.otherTests?.cokeType);
    y += lineHeight / 2;
    doc.text("Elemental Composition", margin, y);
    y += lineHeight;
    const elements = [
      ["SiO2", sampleData.elemental?.sio2],
      ["Al2O3", sampleData.elemental?.al2o3],
      ["Fe2O3", sampleData.elemental?.fe2o3],
      ["CaO", sampleData.elemental?.cao],
      ["MgO", sampleData.elemental?.mgo],
      ["Na2O", sampleData.elemental?.na2o],
      ["K2O", sampleData.elemental?.k2o],
      ["TiO2", sampleData.elemental?.tio2],
      ["P2O5", sampleData.elemental?.p2o5],
      ["SO3", sampleData.elemental?.so3],
    ];
    elements.forEach(([label, value]) => {
      if (y > 760) {
        doc.addPage();
        y = margin;
      }
      doc.text(`${label}: ${value || ""}`, margin, y);
      y += lineHeight;
    });

    y += lineHeight / 2;
    ensurePage();
    drawSection("Sulphur Distribution");
    ["pyritic", "sulphate", "organic"].forEach((key) => {
      const item = sampleData.sulphur?.[key] || {};
      drawKeyValue(`${key.charAt(0).toUpperCase() + key.slice(1)}`, `${item.coal || ""} / ${item.sulphur || ""}`);
    });

    y += lineHeight;
    ensurePage();
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Analyst Signatures", margin, y);
    y += lineHeight * 1.5;
    doc.setFont("helvetica", "normal");
    doc.text("Prepared by:", margin, y);
    doc.line(margin + 90, y + 4, margin + 280, y + 4);
    y += lineHeight * 2;
    doc.text("Verified by:", margin, y);
    doc.line(margin + 90, y + 4, margin + 280, y + 4);
    y += lineHeight * 2;
    doc.text("Authorized Signatory:", margin, y);
    doc.line(margin + 130, y + 4, margin + 380, y + 4);

    doc.save(`lab-report-sample-${sampleId}.pdf`);
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

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading master analysis form details...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          <h5 className="alert-heading fw-bold mb-2">Error Loading Form</h5>
          <p className="mb-3">{error}</p>
          <button className="btn btn-danger btn-sm" onClick={fetchFormDetails}>Retry</button>
        </div>
      ) : (
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

                <SampleMeta
                  partyId={partyId}
                  sampleId={sampleId}
                  partyName={partyName}
                  sampleName={sampleName}
                />

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
                  editable={canEditProximate}
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
                  editable={canEditUltimate}
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
                  editable={canEditSpecial}
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
                  editable={canEditSulphur}
                />

              </div>

            </div>


            {/* SAVE BUTTON */}

            <div className="text-end d-flex flex-wrap gap-2 justify-content-end">

              <button
                className="btn btn-secondary px-4 py-2"
                onClick={generateReportPdf}
              >
                Download Lab Report PDF
              </button>

              <button
                className="btn btn-primary px-4 py-2"
                onClick={saveForm}
              >
                Save Analysis Form
              </button>

            </div>

          </div>

        </div>
      )}

    </div>

  );
}