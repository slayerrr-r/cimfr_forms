import logo from "../../assets/logo.jpg";

export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
      }}
    >
      <div
        style={{
          background: "#0f172a",
          color: "white",
          borderBottom: "3px solid #2563eb"
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "14px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box"
          }}
        >
          {/* LEFT SIDE */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px"
            }}
          >
            <img
              src={logo}
              alt="CIMFR"
              style={{
                height: "85px",
                width: "85px",
                objectFit: "contain",
                background: "white",
                padding: "4px",
                borderRadius: "6px"
              }}
            />

            <div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700"
                }}
              >
                सीएसआईआर - केन्द्रीय खनन एवं ईंधन अनुसंधान संस्थान
              </div>

              <div
                style={{
                  fontSize: "19px",
                  fontWeight: "700"
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

          {/* RIGHT SIDE */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px"
            }}
          >
            <input
              placeholder="Search system..."
              style={{
                width: "260px",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #334155",
                outline: "none",
                background: "#ffffff",
                color: "#111827"
              }}
            />

            <div
              style={{
                textAlign: "right"
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600"
                }}
              >
                Admin User
              </div>

              <div
                style={{
                  fontSize: "13px",
                  opacity: 0.75
                }}
              >
                System Administrator
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}