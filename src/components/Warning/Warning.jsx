import { useState, useCallback } from "react";
import { PropTypes } from "prop-types";

function Warning({ type, message, onClose }) {
  const icon = {
    success: "check-circle-fill",
    danger: "exclamation-triangle-fill",
    warning: "exclamation-triangle-fill",
  };

  const statusMapping = {
    success: "success",
    danger: "danger",
    warning: "warning",
    error: "danger",
  };

  return (
    <div
      className={`alert alert-${statusMapping[type]} alert-dismissible fade show`}
      role="alert"
    >
      <div className="d-flex align-items-center">
        {type && (
          <svg
            className="bi flex-shrink-0 me-2"
            width={24}
            height={24}
            role="img"
            aria-label={type}
          >
            <use xlinkHref={`#${icon[type]}`} />
          </svg>
        )}
        <div>{message}</div>
      </div>
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label="Close"
      ></button>
    </div>
  );
}

Warning.propTypes = {
  type: PropTypes.oneOf(["success", "danger", "warning"]).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const EventHandling = () => {
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  // Function to handle alert display
  const handleAlert = useCallback((type, message) => {
    setAlertType(type);
    setAlertMessage(message);
  }, []);

  // Function to handle alert closure
  const handleClose = useCallback(() => {
    setAlertType(null);
    setAlertMessage("");
  }, []);

  return (
    <div>
      {/* Display success alert */}
      <button
        onClick={() => handleAlert("success", "Báo cáo đã được tạo thành công")}
      >
        Hiển thị Cảnh báo thành công
      </button>
      {/* Display danger alert */}
      <button onClick={() => handleAlert("danger", "Lỗi máy chủ nội bộ")}>
        Hiển thị Cảnh báo lỗi
      </button>
      {/* Display warning alert */}
      <button
        onClick={() => handleAlert("warning", "Bạn phải điền đầy đủ thông tin")}
      >
        Hiển thị Cảnh báo cảnh báo
      </button>

      {/* Render the Warning component if there is an alert */}
      {alertType && (
        <Warning
          type={alertType}
          message={alertMessage}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default EventHandling;
