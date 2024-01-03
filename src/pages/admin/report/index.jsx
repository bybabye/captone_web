import { useEffect, useState } from "react";
import { apiRequest } from "../../../utils/request";
import styles from "./styles.module.css";
import { API_SERVER_LIST_REPORT } from "../../../utils/contants";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import CircleAvatar from "../../../components/CircleAvatar";
export default function ReportAdminPage() {

  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const handleListReport = async () => {
    setIsLoading(true);
    const { status, data } = await apiRequest(
      null,
      "GET",
      `${API_SERVER_LIST_REPORT}`,
      localStorage.getItem("accessToken")
    );
    setReports(data.data);
    console.log(data.data);
    setIsLoading(false);
  };
  function capitalizeFirstLetter(str) {
    if (!str || typeof str !== 'string') {
      return str;
    }
  
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  

  useEffect(() => {
    handleListReport();
  }, []);
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.report}`}>
        <div className={`${styles.report_title}`}>Report</div>
        <div className={`${styles.report_container}`}>
        {reports &&
          reports.map((report) => (
            <div key={report._id} className={`${styles.report_card}`} onClick={() => {
              if(!report.status) {
                navigate(`/admin/report/${report._id}`)
              }
            }}>
              <div className={`${styles.card_title}`}>{capitalizeFirstLetter(report.Objective)}</div>
              <div className={`${styles.card_des}`}>
                {" "}
                <p>Due date :</p>{" "}
                {moment(report.createdAt).format("DD/MM/YYYY HH:mm:ss")}
              </div>
              <div className={`${styles.card_des}`}>
                <p>Title :</p> {report.title}
              </div>
              <div className={`${styles.card_des}`}>
                <p>homeId :</p> {report.homeId ? report.homeId._id : "Đã xoá"}
              </div>
              <div className={`${styles.card_action}`}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                >
                  <CircleAvatar url={report.authorId.avatar} />
                  <div
                    style={{
                      marginLeft: "12px",
                      color: "#707683",
                      fontSize: 14,
                      fontWeight: "400",
                      letterSpacing: 0.13,
                      wordWrap: "break-word",
                    }}
                  >
                    {capitalizeFirstLetter(report.authorId.userName)}
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: report.status ? "#2ED47A" : "#F7685B",
                  }}
                  className={`${styles.card_action_report}`}
                >
                  {report.status ? "Completed" : "Ended"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
