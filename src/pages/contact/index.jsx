import { useContext, useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import { API_SERVER_ADD_NOTIFICATION, API_SERVER_GET_RENTAL_FOR_ID, API_SERVER_RENTAL_CONFIRM } from "../../utils/contants";
import { apiRequest } from "../../utils/request";
import styles from "./styles.module.css";
// icon from react icon
import { CiTimer } from "react-icons/ci";
import { IoIosPricetag } from "react-icons/io";
import { CiHome } from "react-icons/ci";
import moment from "moment";
import CircleAvatar from "../../components/CircleAvatar";
import Warning from "../../components/Warning/Warning";
import { AuthContext } from "../../context/AuthProvider";
export default function Contact() {
  const { rentalId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [chooseImage, setChooseImage] = useState("");
  const [rental, setRental] = useState(false);
  const {user} = useContext(AuthContext);
  // warning
 const [status, setStatus] = useState(0);
 const [message, setMessage] = useState("");
 const [isActive, setIsActive] = useState(false);
 const navigate = useNavigate();
  const handleConfirmRental = async () => {
    const { status, data } = await apiRequest(
        null,
        "PATCH",
        `${API_SERVER_RENTAL_CONFIRM}${rentalId}`,
        localStorage.getItem("accessToken")
      );
      await apiRequest(
        {
          receiverId: rental.tenantId._id,
          target: "rental",
          targetId: rentalId,
          content: `${user.userName} xác nhận bạn đã thuê nhà của họ`,
        },
        "POST",
        `${API_SERVER_ADD_NOTIFICATION}`,
        localStorage.getItem("accessToken")
      );
      setStatus(status);
      setMessage(data.message);
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
        navigate('/rental');
      }, 1000);
  }
  const handleGetRentalForId = async () => {
    setIsLoading(true);
    const { status, data } = await apiRequest(
      null,
      "GET",
      `${API_SERVER_GET_RENTAL_FOR_ID}${rentalId}`,

      localStorage.getItem("accessToken")
    );
    setRental(data.data);
    setChooseImage(data.data.homeId.images[0]);
    console.log(data.data);
    setIsLoading(false);
  };
  useEffect(() => {
    handleGetRentalForId();

  }, []);
  return (
    <>
    <Warning
        status={status}
        message={message}
        isActive={isActive}
        onClose={() => setIsActive(false)}
      />
      <div className={styles.houseDetailPage}>
        <div className={styles.silderImage}>
          {rental && <img src={chooseImage} alt="Image 2" />}
          {rental && (
            <div className={styles.sliderItem}>
              {rental.homeId.images.map((e, index) => (
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
        <div className={`${styles.detailView}`}>
            {rental && (
              <h1 className={styles.title}>
                {rental.homeId.address.stress && `${rental.homeId.address.stress} ,`}
                {rental.homeId.address.subDistrict && `${rental.homeId.address.subDistrict} ,`}
                {rental.homeId.address.district && `${rental.homeId.address.subDistrict} ,`}{" "}
                {rental.homeId.address.city && `${rental.homeId.address.city}.`}
              </h1>
            )}
            <div className={`${styles.adDescription}`}>
              <IoIosPricetag color="#777" />{" "}
              <p>{rental && rental.homeId.price} triệu VND</p>
            </div>
            <div className={`${styles.adDescription}`}>
              <CiTimer color="#777" /> thoi gian dang
            </div>
            <div className={`${styles.adDescription}`}>
              <CiHome color="#777" /> {rental && rental.homeId.roomType}
            </div>
          </div>
          <div className={`${styles.detailView}`}>
            <h1>Mô tả chi tiết</h1>
            {rental.homeId && rental.homeId.des.map((e, index) => <p key={index}>{e}</p>)}
          </div>
          <div style={{display : "flex", flexDirection :"column", justifyContent : "space-between"}} className={`${styles.detailView}`}>
            <h1>Thông tin người thuê</h1>
            {
                rental && (<div className={styles.infoTenant}>
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
                      <div>
                        Địa chỉ : {rental.tenantId.address}
                        
                      </div>
                      <div>
                        Giới tính : {rental.tenantId.cID.sex}
                      </div>
                    </div>
                    
                  </div>)
                  
            }
            <button
                  onClick={handleConfirmRental}
                  className="btn btn-primary mt-4"
                  type="button"
                >
               {rental.rentalStatus ? "Huỷ cho thuê " : "Xác nhận cho thuê"}   
                </button>{" "}
          </div>
      </div>
    </>
  );
}
