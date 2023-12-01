import { BiLogOut, BiMessageRounded, BiUserCircle } from "react-icons/bi";
import { GrNotification } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./styles.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import app from "../../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { BsPersonGear } from "react-icons/bs";

export default function Header({ user }) {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <div className={`${styles.menu}`}>
      <img src={logo} alt="IHML logo" />
      <div className={`${styles.menu_info}`}>
        <div style={{ display: "flex" }}>
          <div className={`${styles.link}`}>
            <Link to={`/`}>Trang chủ</Link>
          </div>
          <div className={`${styles.link}`}>
            <Link>Liên hệ</Link>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {user && user._id != null ? (
            <Dropdown show={isMenuOpen} onToggle={toggleMenu}>
              <img
                onClick={toggleMenu}
                className={`${styles.user_img}`}
                src={user.avatar}
                alt="avatar"
              />
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">
                  <BsPersonGear style={{ marginRight: "6px" }} fontSize={16} />
                  View Personal
                </Dropdown.Item>
                <Dropdown.Item href="#" onClick={handleLogout}>
                  <BiLogOut style={{ marginRight: "6px" }} fontSize={16} />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to={`/login`}>
              <BiUserCircle
                style={{ marginLeft: "12px", marginRight: "12px" }}
                size={26}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
