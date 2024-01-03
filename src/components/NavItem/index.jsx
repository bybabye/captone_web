/* eslint-disable react/prop-types */
import styles from "./styles.module.css";

export default function NavItem({ icon, text, isSelect, isHover, onClick }) {

    return <div className={styles.nav_item} onClick={onClick}>
        {icon}
        <div style={{color : isSelect ? "#109CF1" : "#334D6E"}} className={styles.nav_title}>{text}</div>
    </div>
}
