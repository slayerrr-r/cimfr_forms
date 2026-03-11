import { useLocation } from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();
  const path = location.pathname;

  let active = "parties";

  if (path.startsWith("/party/")) active = "samples";
  if (path.startsWith("/sample/")) active = "analysis";

  return (

    <div
      style={{
        width: "240px",
        background: "#111827",
        color: "#e5e7eb",
        minHeight: "100vh",
        paddingTop: "20px",
        borderRight: "1px solid #1f2937"
      }}
    >

      <div
        style={{
          padding: "0 20px",
          fontWeight: "600",
          fontSize: "18px",
          marginBottom: "20px"
        }}
      >
        LIMS Panel
      </div>

      <NavItem label="Parties" icon="📁" active={active === "parties"} />
      <NavItem label="Samples" icon="🧪" active={active === "samples"} />
      <NavItem label="Analysis Forms" icon="📊" active={active === "analysis"} />
      <NavItem label="Reports" icon="📄" active={false} />
      <NavItem label="Settings" icon="⚙" active={false} />

    </div>

  );
}



function NavItem({ label, icon, active }) {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 18px",
        margin: "6px 12px",
        cursor: "default",

        background: active ? "#1f2937" : "transparent",
        color: active ? "white" : "#cbd5f5",

        fontWeight: active ? "500" : "400",

        borderRadius: "8px",

        borderLeft: active ? "4px solid #1d4ed8" : "4px solid transparent",

        boxShadow: active
          ? "0 4px 10px rgba(0,0,0,0.35)"
          : "none",

        transform: active
          ? "translateY(-1px)"
          : "none",

        transition: "all 0.2s ease"
      }}

      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = "#1f2937";
      }}

      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "transparent";
      }}

    >

      <span style={{ fontSize: "18px" }}>
        {icon}
      </span>

      <span>
        {label}
      </span>

    </div>

  );

}