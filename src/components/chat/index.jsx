import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect, useRef, useState } from "react";
import { apiRequest } from "../../utils/request";
import {
  API_SERVER_GET_GUEST_USER,
  API_SERVER_GET_LIST_MESSAGES_FOR_ID,
  API_SERVER_SEND_MESSAGE_FOR_ID,
} from "../../utils/contants";
import { GrSend } from "react-icons/gr";
export default function Chat() {
  const { messId } = useParams();
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);
  const [mess, setMess] = useState("");
  const [guest, setGuest] = useState({});
  console.log(messId);

  const handleGetGuestUser = async () => {
    const { guest } = await apiRequest(
      null,
      "GET",
      `${API_SERVER_GET_GUEST_USER}?chatId=${messId}`,
      localStorage.getItem("accessToken")
    );

    console.log(guest);

    setGuest(guest);
  };

  const handleGetMessage = async () => {
    const { data } = await apiRequest(
      null,
      "GET",
      `${API_SERVER_GET_LIST_MESSAGES_FOR_ID}?chatId=${messId}`,
      localStorage.getItem("accessToken")
    );

    setMessages(data);
  };
  useEffect(() => {
    handleGetGuestUser();
    handleGetMessage();
  }, []);



  const handleAddMessageForChatId = async () => {
    if (messages) {
      const data = await apiRequest(
        {
          type: "text",
          content: mess,
        },
        "POST",
        `${API_SERVER_SEND_MESSAGE_FOR_ID}?chatId=${messId}`,
        localStorage.getItem("accessToken")
      );
      console.log(data);
    }
  };
  const addChatForEnter = async (e) => {
    if (e.key === "Enter") {
      await handleAddMessageForChatId();
    }
  };
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.info_user}`}>
        <img src={guest.avatar} alt="avatar" />
        <p>{guest.userName}</p>
      </div>
      <div ref={messageListRef} className={`${styles.messages}`}>
        {messages.map((message) => {
          return (
            <div key={message._id}>
              <div
                style={{
                  display: "flex",
                  paddingBottom: "12px",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: `${
                    message.senderId === guest._id ? "flex-start" : "flex-end"
                  }`,
                }}
              >
                <div>
                  <div
                    style={{
                      display: `${
                        message.senderId === guest._id ? "flex" : ""
                      }`,
                    }}
                    className={`${styles.message_guest}`}
                  >
                    {message.senderId === guest._id && (
                      <img src={guest.avatar} alt="avatar" />
                    )}
                    <div className={`${styles.message_content}`}>
                      {message.content}
                    </div>
                  </div>
                  <div className={`${styles.message_sentTime}`}>
                    {message.sentTime}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${styles.send_mess}`}>
        <div onClick={handleAddMessageForChatId} className={`${styles.send_mess_icon}`}>
          <GrSend size={24} />
        </div>
        <input
          onKeyDown={(e) => addChatForEnter(e)}
          value={mess}
          onChange={(e) => setMess(e.target.value)}
        />
      </div>
    </div>
  );
}
