import { FaUserAlt, FaTasks, FaRegTrashAlt } from "react-icons/fa";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className={`${styles.header}`}>
      <div className="d-flex sidebar flex-column flex-shrink-0  bg-dark">
        <ul className="nav nav-pills flex-column mb-auto px-0 mt-3">
          <li className="nav-item ">
            <Link to="/admin/list/user" className="nav-link text-white">
              <FaUserAlt /> <span className="ms-2">Users</span>
            </Link>
          </li>
          <li className="nav-item ">
            <Link to="/admin/report" className="nav-link text-white">
              <FaTasks /> <span className="ms-2">Report</span>
            </Link>
          </li>
          <li className="nav-item ">
            <Link to="/admin/block/user" className="nav-link text-white">
              <FaRegTrashAlt /> <span className="ms-2">Block</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
