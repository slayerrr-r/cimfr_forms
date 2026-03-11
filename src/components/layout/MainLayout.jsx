import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {

  return (

    <div>

      <Header />

      <div style={{ display: "flex" }}>

        <Sidebar />

        <div style={{ flex: 1, padding: "30px" }}>
          {children}
        </div>

      </div>

    </div>

  );

}