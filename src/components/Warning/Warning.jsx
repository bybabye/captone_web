import styles from "./styles.module.css";
import { MdOutlineError } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";

// eslint-disable-next-line react/prop-types
function Warning({ status, message, isActive, onClose }) {
  const iconMapping = (status, message) => {
    const value = {
      color: "red",
      message: "Ôi hỏng",
      icon: <MdOutlineError size={16} color="red" />,
    };
    switch (status) {
      case 0:
        value.color = "yellow";
        value.message = message;
        value.icon = <IoIosWarning size={16} color={value.color} />;
        break;
      case 200 :
        value.color = "green";
        value.message = message;
        value.icon = <BsCheckCircleFill size={16} color={value.color} />;
        break;
      case  201:
        value.color = "green";
        value.message = message;
        value.icon = <BsCheckCircleFill size={16} color={value.color} />;
        break;
      case 403:
        value.color = "yellow";
        value.message =
          "Truy cập bị từ chối. Bạn phải đăng nhập mới sử dụng được tác vụ này";
        value.icon = <IoIosWarning size={16} color={value.color} />;
        break;
      case 404:
        value.message = message;

        break;

      default:
        value.message = "Lỗi máy chủ nội bộ. Vui lòng thử lại sau.";
        break;
    }
    return value;
  };
  const { color, icon, message: mappedMessage } = iconMapping(status, message);
  return (
    <div
      style={{ display: isActive ? "block" : "none" }}
      className={`${styles.wrapper}`}
      onClick={onClose}
    >
      <div
        style={{
          display: isActive ? "block" : "none",
          borderLeft: `5px ${color} solid`,
        }}
        className={`${styles.notification}`}
      >
        <div className={`${styles.notificationContent}`}>
          <div className={`${styles.notificationContentTitle}`}>
            {" "}
            <div style={{ display: "inline" }}>{icon}</div> IHMLMarket
          </div>
          <div className={`${styles.notificationContentMessage}`}>
            {mappedMessage}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Warning;
