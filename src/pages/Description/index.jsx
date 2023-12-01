import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { AuthContext } from "../../context/AuthProvider";
export default function DescriptionPage() {
  //user khi da dang nhap
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const { user } =  useContext(AuthContext);
  console.log(user);
  const socket = io.connect("http://localhost:8800");

  const addUserToSocket = () => {
    if (user && user.uid) {
      // Gửi sự kiện 'add-user' khi người dùng được thêm vào
      socket.emit("add-user", user.uid);
      setIsUserLoaded(true);
    }
  };
  // Hàm gửi thông báo từ phía client
  const sendNotification = (data) => {
    console.log("data click");
    socket.emit("send-notification", data);
  };
  useEffect(() => {
    const storedUid = localStorage.getItem("accessToken");
    console.log(socket);

    if (storedUid) {
      addUserToSocket();
      // Nghe sự kiện 'notification' để xử lý thông báo từ server
      socket.on("notification", (data) => {
        console.log("Received notification:", data);
        // Xử lý thông báo ở đây
      });

      // Clean up khi component unmount
      return () => {
        socket.disconnect();
      };
    }
  }, []); // Chạy useEffect chỉ một lần khi component được render và khi 'uid' trong localStorage thay đổi
  // Nếu 'user' chưa được tải, hiển thị một thông báo hoặc placeholder

  // JSX của component ở đây
  return !isUserLoaded ? (
    <div>Loading user...</div>
  ) : (
    <div>
      <button
        onClick={() =>
          sendNotification({
            receiverId: "64fad036c7a97114a7c9cac5",
            targetId: "someTargetId",
            content: "Hello!",
            target: "someTarget",
          })
        }
      >
        gui api
      </button>
    </div>
  );
}
