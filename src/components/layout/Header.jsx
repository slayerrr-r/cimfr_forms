import logo from "../../assets/logo.jpg";

export default function Header() {
  return (
    <div>

      {/* MAIN HEADER */}

      <div
        style={{
          background: "#0f172a",
          color: "white",
          borderBottom: "3px solid #2563eb"
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px"
          }}
        >

          {/* LEFT SIDE — LOGO + TITLE */}

          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>

            <img
              src={logo}
              alt="CIMFR"
              style={{
                height: "75px"
              }}
            />

            <div>

              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600"
                }}
              >
                सीएसआईआर - केन्द्रीय खनन एवं ईंधन अनुसंधान संस्थान
              </div>

              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600"
                }}
              >
                CSIR - CENTRAL INSTITUTE OF MINING AND FUEL RESEARCH
              </div>

              <div
                style={{
                  fontSize: "14px",
                  opacity: 0.9
                }}
              >
                NAGPUR RESEARCH CENTRE (FUEL SCIENCE)
              </div>

              <div
                style={{
                  fontSize: "12px",
                  opacity: 0.7
                }}
              >
                Laboratory Information Management System
              </div>

            </div>

          </div>


          {/* RIGHT SIDE — SEARCH + USER */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px"
            }}
          >

            {/* SEARCH */}

            <input
              placeholder="Search system..."
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "none",
                width: "220px"
              }}
            />

            {/* USER */}

            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "500" }}>
                Admin User
              </div>

              <div
                style={{
                  fontSize: "12px",
                  opacity: 0.7
                }}
              >
                System Administrator
              </div>
            </div>

          </div>

        </div>
      </div>



      {/* NAVIGATION BAR */}

      <div
        style={{
          background: "#1e293b",
          color: "white"
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "auto",
            display: "flex",
            gap: "30px",
            padding: "10px 20px",
            fontSize: "14px"
          }}
        >

          <div style={{ cursor: "pointer", fontWeight: "500" }}>
            Home
          </div>

          <div style={{ cursor: "pointer" }}>
            Laboratory Systems
          </div>

          <div style={{ cursor: "pointer" }}>
            Sample Tracking
          </div>

          <div style={{ cursor: "pointer" }}>
            Analysis Reports
          </div>

          <div style={{ cursor: "pointer" }}>
            Help
          </div>

        </div>
      </div>

    </div>
  );
}