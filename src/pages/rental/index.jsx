import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthProvider";
import styles from "./styles.module.css";
import { apiRequest } from "../../utils/request";
import { useNavigate } from "react-router-dom";
import { API_SERVER_GET_LIST_RENTAL_FOR_HOST } from "../../utils/contants";
import moment from "moment";
export default function RentalPage() {
  const { user } = useContext(AuthContext);
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();
  const handleGetListRental = async () => {
    const { status, data } = await apiRequest(
      null,
      "GET",
      `${API_SERVER_GET_LIST_RENTAL_FOR_HOST}`,
      localStorage.getItem("accessToken")
    );
    console.log(status, data.data);
    setRentals(data.data);
  };
  useEffect(() => {
    handleGetListRental();
  }, []);
  return (
    <div className={styles.wrapper}>
      <Header user={user} />
      <div className={styles.rental}>
        <h1>List Rental</h1>
        <div className={styles.listRental}>
          {!rentals ? 
            <p>ban chua co rental nao ca</p>
           : (
            rentals.map((rental) => (
              <div onClick={() => {
                navigate(`/rental/${rental._id}`)
              }} key={rental._id} className={styles.rentalItem}>
                <div className={styles.rentalTitle}>
                  {rental.homeId.address.stress}
                </div>
                <div className={styles.rentalImage}>
                  <img src={rental.homeId.images[0]} alt="img" />
                </div>
                <div>
                  Tình Trạng :{" "}
                  {rental.rentalStatus ? "Đã thuê" : "Đang chờ duyệt"}
                </div>
                <div>
                  Giá thuê :{" "}
                  <p
                    style={{
                      display: "inline",
                      color: "#C90927",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {rental.homeId.price}/tháng
                  </p>
                </div>
                <div>Ngày gửi yêu cầu :  {moment(rental.createdAt).format(
                        "DD/MM/YYYY"
                      )}</div>
                <div>Thời gian thuê : {rental.leasePeriod} tháng</div>
                <div>Người thuê </div>
                <div className={styles.infoTenant}>
                  <img src={rental.tenantId.avatar} alt="img" />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
                    <div>Tên : {rental.tenantId.cID.fullName}</div>
                    <div>
                      Ngày Sinh :{" "}
                      {moment(rental.tenantId.cID.dateOfBirth).format(
                        "DD/MM/YYYY"
                      )}{" "}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {}}
                  className="btn btn-primary mb-4"
                  type="button"
                >
                  Chi tiết
                </button>{" "}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
