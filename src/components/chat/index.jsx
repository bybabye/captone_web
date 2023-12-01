import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import {  useContext, useEffect, useRef, useState } from "react";
import { apiRequest } from "../../utils/request";
import {
  API_SERVER_GET_GUEST_USER,
  API_SERVER_GET_LIST_MESSAGES_FOR_ID,
  API_SERVER_SEND_MESSAGE_FOR_ID,
} from "../../utils/contants";
import { GrSend } from "react-icons/gr";
import { SocketContext } from "../../context/socketProvider";
import { AuthContext } from "../../context/AuthProvider";
import { v4 as uuidv4 } from 'uuid';
export default function Chat() {
  
  const { messId } = useParams();
  const [isLoading,setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);
  const [mess, setMess] = useState("");
  const [guest, setGuest] = useState({});
  const socket = useContext(SocketContext)
  const { user } =  useContext(AuthContext);
  
  
  // lấy user trên thanh menu gồm avatar , name
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

  // lấy đoạn chat trong database
 
  const handleGetMessage = async () => {
    
    try {
      setIsLoading(true)
      console.log(isLoading);
      const { data } = await apiRequest(
        null,
        "GET",
        `${API_SERVER_GET_LIST_MESSAGES_FOR_ID}?chatId=${messId}`,
        localStorage.getItem("accessToken")
      );
      setMessages(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
      console.log(isLoading);
    }
  };

  const sendMessageForSocket = (content,id) => {
    socket.emit('send-message',{
      'chatId': messId,
      'message': {
        mId : id,
        type : 'text',
        content : content,
        senderId : user._id,
        sendTime : Date(),
        chatId : messId,
      },
    })
  }

  useEffect(() => {
    socket.on('chat-id',(data) => {
      console.log(data);
      setMessages(prevMessage => [...prevMessage,data.message])
      console.log(messages);
    })
  },[])


  useEffect(() => {
    socket.emit('join-room', {
      'chatId': messId,
    });
    

    handleGetGuestUser();
    handleGetMessage();
  }, [messId]);



  const handleAddMessageForChatId = async () => {
    
    if (messages) {
      const id = uuidv4();
      const data = await apiRequest(
        {
          mId : id,
          type: "text",
          content: mess,
        },
        "POST",
        `${API_SERVER_SEND_MESSAGE_FOR_ID}?chatId=${messId}`,
        localStorage.getItem("accessToken")
      );
      console.log('da send');
      sendMessageForSocket(mess,id)
      console.log(data);
    }
  };
  const addChatForEnter = async (e) => {
    if (e.key === "Enter") {
      await handleAddMessageForChatId();
      setMess('')
    }
  };
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);
  return ( isLoading ? <div>Loading</div> : 
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.info_user}`}>
        <img src={guest.avatar} alt="avatar" />
        <p>{guest.userName}</p>
      </div>
      <div ref={messageListRef} className={`${styles.messages}`}>
        {messages.map((message) => {
          return (
            <div key={message.messId}>
              <div
                style={{
                  display: "flex",
                  paddingBottom: "12px",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: `${
                    message.senderId !== user._id ? "flex-start" : "flex-end"
                  }`,
                }}
              >
                <div>
                  <div
                    style={{
                      display: `${
                        message.senderId !== user._id ? "flex" : ""
                      }`,
                    }}
                    className={`${styles.message_guest}`}
                  >
                    {message.senderId !== user._id && (
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
