/* eslint-disable react/prop-types */
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
import { CiHome } from "react-icons/ci";
import { SiGoogletagmanager } from "react-icons/si";
export default function Header({ user }) {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleGoHome = () => {
    navigate("/");
  };
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <div className={`${styles.menu}`}>
      <img src={logo} alt="IHML logo" />
      <div className={`${styles.menu_info}`}>
        <div onClick={handleGoHome} className={`${styles.gohome}`}>
          IHML your home{" "}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {user && user._id != null ? (
            <Dropdown
              className={`${styles.dropdown}`}
              show={isMenuOpen}
              onToggle={toggleMenu}
            >
              <img
                onClick={toggleMenu}
                className={`${styles.user_img}`}
                src={user.avatar}
                alt="avatar"
              />
              <Dropdown.Menu>
                <Dropdown.Item href="/home/login=true">
                  <CiHome style={{ marginRight: "6px" }} fontSize={16} />
                  Home Page
                </Dropdown.Item>
                { user.roles === "host" &&
                  <Dropdown.Item href="/renal">
                    <SiGoogletagmanager style={{ marginRight: "6px" }} fontSize={16}  />
                  
                  Manager Rental
                </Dropdown.Item>
                }
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
