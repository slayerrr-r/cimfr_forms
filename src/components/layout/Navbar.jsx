import { Link } from "react-router-dom";

export default function Navbar() {

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

      <div className="container">

        <span className="navbar-brand">
          LIMS Dashboard
        </span>

        <div className="collapse navbar-collapse">

          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Parties
              </Link>
            </li>

          </ul>

          <span className="navbar-text text-white">
            Admin Panel
          </span>

        </div>

      </div>

    </nav>

  );
}