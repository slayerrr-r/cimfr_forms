import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;

  let active = "parties";

  if (path === "/") active = "home";
  else if (path.startsWith("/party/")) active = "samples";
  else if (path.startsWith("/sample/")) active = "analysis";

  return (
    <aside
      style={{
        position: "fixed",
        top: "127px",
        left: 0,

        width: "220px",
        height: "calc(100vh - 106px)",

        background:
          "linear-gradient(180deg, #0f172a 0%, #111827 100%)",

        borderRight: "1px solid #1f2937",

        overflowY: "auto",

        zIndex: 1000
      }}
    >
      <div
        style={{
          padding: "22px 20px",
          fontWeight: "700",
          fontSize: "18px",
          color: "#ffffff",
          borderBottom: "1px solid #1f2937",
          marginBottom: "12px"
        }}
      >
        LIMS Panel
      </div>

      <NavItem
        label="Dashboard"
        icon="⌂"
        active={active === "home"}
        onClick={() => navigate("/")}
      />

      <NavItem
        label="Parties"
        icon="▣"
        active={active === "parties"}
        onClick={() => navigate("/parties")}
      />

      <NavItem
        label="Samples"
        icon="◫"
        active={active === "samples"}
      />

      <NavItem
        label="Analysis Forms"
        icon="◧"
        active={active === "analysis"}
      />

      <NavItem
        label="Reports"
        icon="▤"
        active={false}
      />

      <NavItem
        label="Settings"
        icon="⚙"
        active={false}
      />
    </aside>
  );
}

function NavItem({
  label,
  icon,
  active,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",

        padding: "14px 18px",
        margin: "8px 10px",

        cursor: onClick ? "pointer" : "default",

        background: active
          ? "#1f2937"
          : "transparent",

        color: active
          ? "#ffffff"
          : "#cbd5e1",

        fontWeight: active ? "600" : "500",

        borderRadius: "12px",

        borderLeft: active
          ? "4px solid #1d4ed8"
          : "4px solid transparent",

        boxShadow: active
          ? "0 8px 20px rgba(0,0,0,0.35)"
          : "none",

        transition: "all 0.25s ease"
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = "#1f2937";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      <span
        style={{
          fontSize: "20px",
          width: "24px",
          textAlign: "center"
        }}
      >
        {icon}
      </span>

      <span>{label}</span>
    </div>
  );
}