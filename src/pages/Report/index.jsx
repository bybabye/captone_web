import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Warning from "../../components/Warning/Warning";
import { API_SERVER_ADD_REPORT } from "../../utils/contants";
import { apiRequest } from "../../utils/request";

export default function ReportPage({ show, onClose, homeId }) {
  const [title, setTitle] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // warning
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const handleSelectChange = (event) => {
    // Lấy giá trị được chọn từ sự kiện onChange
    const selectedValue = event.target.value;

    // Cập nhật state với giá trị được chọn
    setSelectedOption(selectedValue);

    // In giá trị để kiểm tra
    console.log("Selected Option:", selectedValue);
  };

  const handleModalSubmit = async () => {
    console.log(homeId);
   
    console.log(`${API_SERVER_ADD_REPORT}${homeId}`);
    const { status, data } = await apiRequest(
      {
        title: title,
        Objective: selectedOption,
      },
      "POST",
      `${API_SERVER_ADD_REPORT}${homeId}`,
      localStorage.getItem("accessToken")
    );
    console.log(status, data);
    onClose()
   
    setStatus(status);
    setMessage(data.message);
    setIsActive(true);
  };

  return (
    <>
      <Warning
        status={status}
        message={message}
        isActive={isActive}
        onClose={() => setIsActive(false)}
      />
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Báo cáo vi phạm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label">
                Bài đăng này có vấn đề gì:
              </label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={handleSelectChange}
                value={selectedOption}
              >
                <option value="violence">Bạo lực</option>
                <option value="spam">Tin rác</option>
                <option value="hateful language">Ngôn ngữ căm thù</option>
                <option value="false information">Thông tin giả mạo</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message-text" className="col-form-label">
                Mô tả chi tiết:
              </label>
              <textarea
                className="form-control"
                id="message-text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Thoát
          </Button>
          <Button variant="primary" onClick={() => handleModalSubmit()}>
            Gửi báo cáo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
