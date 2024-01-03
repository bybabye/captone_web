import { useEffect, useState } from "react";
import CircleAvatar from "../../../components/CircleAvatar";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import {
  API_SERVER_INFOMATION_USER,
  API_SERVER_PATCH_BLOCK_USER,
  API_SERVER_PATCH_UNBLOCK_USER,
} from "../../../utils/contants";
import { apiRequest } from "../../../utils/request";
import { GoDotFill } from "react-icons/go";
import Warning from "../../../components/Warning/Warning";
export default function InfomationUser() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // warning
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const handleGetInfomationUser = async () => {
    setIsLoading(true);
    const { status, data } = await apiRequest(
      null,
      "GET",
      `${API_SERVER_INFOMATION_USER}${id}`,
      localStorage.getItem("accessToken")
    );
    setUser(data.data);
    setIsLoading(false);
    console.log(data);
  };

  const handleBlockUser = async () => {
    const apiEndpoint = user.isBlocked
      ? API_SERVER_PATCH_UNBLOCK_USER
      : API_SERVER_PATCH_BLOCK_USER;

    const { status, data } = await apiRequest(
      null,
      "PATCH",
      `${apiEndpoint}/${id}`,
      localStorage.getItem("accessToken")
    );

    setUser({ ...user, isBlocked: !user.isBlocked });
    setStatus(status);
    setMessage(data.message);
    setIsActive(true);
  };

  useEffect(() => {
    handleGetInfomationUser();
  }, []);
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <><Warning
    isActive={isActive}
    message={message}
    status={status}
    onClose={() => setIsActive(false)}
  />
  <div className={`${styles.wrapper}`}>
      
      {user && (
        <div className={`${styles.infomation}`}>
          <div>
            <CircleAvatar height={120} width={120} url={user.avatar} />
            <div className={`${styles.infomation_fullName}`}>
              {user.cID.fullName}
            </div>
            <div className={`${styles.infomation_des}`}>
              {" "}
              <p>roles : </p>
              {user.roles}
            </div>
            <div className={`${styles.infomation_des}`}>
              {" "}
              <p>tel : </p>
              {user.phoneNumber}
            </div>
          </div>
        </div>
      )}
      {user && (
        <div className={`${styles.content}`}>
          <div>
            <div className={`${styles.infomation_des}`}>
              <GoDotFill />
              <p>Họ và tên : </p>
              {user.cID.fullName ?? "Thiếu thông tin"}
            </div>
            <div className={`${styles.infomation_des}`}>
              <GoDotFill />
              <p>Ngày Sinh: </p>
              {user.cID.dateOfBirth ?? "Thiếu thông tin"}
            </div>
            <div className={`${styles.infomation_des}`}>
              <GoDotFill />
              <p>Số CMND : </p>
              {user.cID.no ?? "Thiếu thông tin"}
            </div>
            <div className={`${styles.infomation_des}`}>
              <GoDotFill />
              <p>Giới tính : </p>
              {user.cID.sex ?? "Thiếu thông tin"}
            </div>
            <div className={`${styles.infomation_des}`}>
              <GoDotFill />
              <p>Địa chỉ : </p>
              {user.address ?? "Thiếu thông tin"}
            </div>
            <div className={`${styles.infomation_des}`}>
              <GoDotFill />
              <p>Quê quán : </p>
              {user.cID.placeOfOrigin ?? "Thiếu thông tin"}
            </div>
            <div className={`${styles.infomation_des}`}>
              <GoDotFill />
              <p>Nơi cư trú : </p>
              {user.cID.placeOfResidence ?? "Thiếu thông tin"}
            </div>
            <div className={`${styles.infomation_des}`}>
              <GoDotFill />
              <p>Số bài đã đăng: </p>
              {user.numberOfHomes ?? "Không có bài nào"}
            </div>
            <div className={`${styles.infomation_des}`}>
              <GoDotFill />
              <p>Số phòng đã cho thuê: </p>
              {user.numberOfRental ?? "Không có phòng nào"}
            </div>
            <div className={`${styles.infomation_des}`}>
              <GoDotFill />
              <p>Số bài bị cáo: </p>
              {user.numberOfReports ?? "Không có phòng nào"}
            </div>
            <div className={`${styles.infomation_des}`}>
              <GoDotFill />
              <p>Số báo cáo được tạo : </p>
              {user.numberOfReportsCreatedByUser ?? "Không có phòng nào"}
            </div>
          </div>
          <div className={`${styles.actions}`}>
            <div
              className={`${styles.actions_button} ${styles.block}`}
              onClick={handleBlockUser}
            >
              {user.isBlocked ? "UnBlock" : "Block"}
            </div>
            {user.roles !== "host" && (
              <div className={`${styles.actions_button}`}>Upgrade Hosting</div>
            )}
            <div className={`${styles.actions_button}`}></div>
          </div>
        </div>
      )}
    </div>
  </>
    
  );
}
