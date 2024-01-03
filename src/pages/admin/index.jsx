import { useCallback, useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import styles from "./styles.module.css";
import { Outlet, useNavigate } from "react-router-dom";
export default function AdminPage() {
  const navigate = useNavigate();
  const [tabActive,setTabActive] = useState("");
  

  useEffect(()=> {
    handleNavigate(tabActive);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tabActive])

  const handleNavigate = useCallback((url) => {
    navigate(url,{replace : true})
  },[navigate])
  return (
    <div className={styles.wrapper}>
      <div className={styles.sideBar}>
        <SideBar tabActive={tabActive} onClickTab={setTabActive} />
      </div>
      <div className={styles.content}>
        <Outlet/>
      </div>
    </div>
  );
}
