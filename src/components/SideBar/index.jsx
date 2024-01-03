/* eslint-disable react/prop-types */
import { useContext } from "react";
import NavItem from "../NavItem";
import styles from "./styles.module.css";
import { CiHome, CiLogout } from "react-icons/ci";
import { TbReportAnalytics } from "react-icons/tb";
import { AuthContext } from "../../context/AuthProvider";
import CircleAvatar from "../CircleAvatar";
import {  useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../../firebase/config";
export default function SideBar({tabActive,onClickTab}) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth(app);
    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
      };
    
    return <div className={`${styles.wrapper}`}>
        <div className={`${styles.info}`}>
            <CircleAvatar url={user.avatar}/>
            <div className={`${styles.info_userName}`}>{user.userName}</div>
        </div>
        <NavItem icon={<CiHome size={20} color={tabActive === "" ? "#109CF1" : "#334D6E"} />} text={"Home"} isSelect={tabActive === ""} isHover={false} onClick={() => onClickTab("")}/>
        <NavItem icon={<TbReportAnalytics  size={20} color={tabActive === "report" ? "#109CF1" : "#334D6E"} />} text={"Report"} isSelect={tabActive === "report"} isHover={false} onClick={() => onClickTab("report")}/>
        <NavItem icon={<CiLogout   size={20} color={"#334D6E"} />} text={"Logout"} isSelect={tabActive === "logout"} isHover={false} onClick={handleLogout}/>
    </div>
}
