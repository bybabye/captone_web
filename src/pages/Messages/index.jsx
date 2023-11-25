import { useContext, useEffect, useState } from "react";
import { apiRequest } from "../../utils/request";
import { API_SERVER_LIST_CHAT } from "../../utils/contants";
import { AuthContext } from "../../context/AuthProvider";
import { Link, Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import Header from "../../components/Header";

export default function Messages() {
  const [chats, setChats] = useState([]);
  const { user } = useContext(AuthContext);

  console.log(user);

  const handleListChat = async () => {
    const { data } = await apiRequest(
      null,
      "GET",
      API_SERVER_LIST_CHAT,
      localStorage.getItem("accessToken")
    );
    console.log(data);
    setChats(data);
  };

  useEffect(() => {
    handleListChat();
  }, []);

  return (
    <div className={`${styles.wrapper}`}>
      <div className="row">
        <Header user={user} />
      </div>
      <div className={`${styles.chat}`}>
        <div className={`${styles.chat_list}`}>
          <div style={{ padding: "8px" }} className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm..."
            />
          </div>
          {chats &&
            chats.map((chat) => {
              const users = chat.membersId.find((e) => e._id !== user._id);

              return (
                <Link
                  key={chat._id}
                  to={`chat/${chat._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    key={chat._id}
                    className={`${styles.chat_info} ${
                      chat.senderId === user._id
                        ? styles.sender
                        : styles.receiver
                    }`}
                  >
                    <img src={users.avatar} alt="avatar" />
                    <p>{users.userName}</p>
                  </div>
                </Link>
              );
            })}
        </div>
        <div className={`${styles.messages}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
