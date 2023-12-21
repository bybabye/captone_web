import logo from "../../assets/logo.png";
import styles from "./styles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <div className={`${styles.header}`}>
      <div className="d-flex justify-content-around bg-white">
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="d-flex align-items-center text-dark">
          <h2>IHML Market</h2>
        </div>
      </div>
    </div>
  );
}

export default Header;
