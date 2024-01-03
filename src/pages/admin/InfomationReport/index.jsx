import { useEffect, useState } from "react";
import { apiRequest } from "../../../utils/request";
import { API_SERVER_REPORT_DELETED_, API_SERVER_REPORT_FOR_ID, API_SERVER_SKIP_REPORT } from "../../../utils/contants";
import { useParams ,useNavigate} from "react-router-dom";

import styles from "./styles.module.css";
import Warning from "../../../components/Warning/Warning";
export default function InfomationReport() {
  const [report, setReport] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [chooseImage, setChooseImage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
 // warning
 const [status, setStatus] = useState(0);
 const [message, setMessage] = useState("");
 const [isActive, setIsActive] = useState(false);
  const handleSkipperReport = async () => {
    const { status, data } = await apiRequest(
      null,
      "PATCH",
      `${API_SERVER_SKIP_REPORT}${id}`,
      localStorage.getItem("accessToken")
    );
    setStatus(status);
    setMessage(data.message);
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
      navigate('/admin/report');
    }, 1000);
  }
  const handleDeletedPostForReport = async () => {
    const { status, data } = await apiRequest(
      null,
      "DELETE",
      `${API_SERVER_REPORT_DELETED_}${id}`,
      localStorage.getItem("accessToken")
    );
    setStatus(status);
    setMessage(data.message);
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
      navigate('/admin/report');
    }, 1000);
  }


  const handleReportForId = async () => {
    setIsLoading(true);
    const { status, data } = await apiRequest(
      null,
      "GET",
      `${API_SERVER_REPORT_FOR_ID}${id}`,
      localStorage.getItem("accessToken")
    );
    setChooseImage(data.data.homeId.images[0]);
    setReport(data.data);
    console.log(data.data);
    setIsLoading(false);
  };
  useEffect(() => {
    handleReportForId();
  }, []);
  return (
    <>
     <Warning
        status={status}
        message={message}
        isActive={isActive}
        onClose={() => setIsActive(false)}
      />
      <div className={`${styles.wrapper}`}>
        <div className={styles.silderImage}>
          {report && <img src={chooseImage} alt="Image 2" />}
          {report && (
            <div className={styles.sliderItem}>
              {report.homeId.images.map((e, index) => (
                <img
                  onClick={() => setChooseImage(e)}
                  key={index}
                  src={e}
                  alt="Image 2"
                />
              ))}
            </div>
          )}
        </div>
        <div className={`${styles.content}`}>
          {report && (
            <div className={`${styles.detailView}`}>
              <h1>Thông tin chi tiết</h1>
              <p>
                {report.homeId.address.stress &&
                  `${report.homeId.address.stress} ,`}
                {report.homeId.address.subDistrict &&
                  `${report.homeId.address.subDistrict} ,`}
                {report.homeId.address.district &&
                  `${report.homeId.address.subDistrict} ,`}{" "}
                {report.homeId.address.city && `${report.homeId.address.city}.`}
              </p>
              <p>Room type : {report.homeId.roomType}</p>
              <p>price : {report.homeId.price ?? "Không có dữ liệu"}</p>
            </div>
          )}
          <div className={`${styles.detailView}`}>
            <h1>Mô tả chi tiết</h1>
            {report &&
              report.homeId.des.map((e, index) => <p key={index}>{e}</p>)}
          </div>
          {report && (
            <div className={`${styles.detailView}`}>
              <h1>Objective : {report.Objective}</h1>
              <p>{report.title}</p>
            </div>
          )}
          <div className={`${styles.actions}`}>
            <div onClick={handleSkipperReport} className={`${styles.actions_button}`}>Skipped</div>
            <div onClick={handleDeletedPostForReport} style={{backgroundColor : "#F7685B"}} className={`${styles.actions_button}`}>Deleted Post</div>
          </div>
        </div>
      </div>
    </>
  );
}
