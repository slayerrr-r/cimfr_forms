import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />

      <Sidebar />

      <main
        style={{
          marginLeft: "220px",
          marginTop: "150px",

          minHeight: "calc(100vh - 150px)",

          padding: "30px",

          background: "#f5f7fb",

          overflowX: "hidden"
        }}
      >
        {children}
      </main>
    </div>
  );
}