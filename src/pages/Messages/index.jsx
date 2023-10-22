import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { apiRequest } from "../../utils/request";
import { API_SERVER_LIST_CHAT } from "../../utils/contants";
import { AuthContext } from "../../context/AuthProvider";

export default function Messages() {
  
  
  const [chats,setChats] = useState([]);
  const {user} = useContext(AuthContext);
  console.log(user);


  const handleListChat = async() => {
    const {data} = await apiRequest(null,"GET",API_SERVER_LIST_CHAT,localStorage.getItem("accessToken"))
    console.log(data);
    setChats(data)
  }

  useEffect(() => {
    handleListChat()
  },[])




  const itemChat = (avatar,name,status,id) => {
    return (
      <div key={id}>
        <li className="clearfix">
          <img
            src={`${avatar}`}
            alt="avatar"
          />
          <div className="about">
            <div className="name">{name}</div>
            <div className="status">
              {" "}
              <i className="fa fa-circle offline" /> {status}
            </div>
          </div>
        </li>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm..."
                />
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search" />
                  </span>
                </div>
              </div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
               {chats.map(chat => {
                const users = chat.membersId.find(e => e._id !== user._id)
                console.log(users);
                return itemChat(users.avatar,users.userName,"aloi",users._id)
               })}
               
              </ul>
            </div>
            <div className="chat">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6">
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#view_info"
                    >
                      <img
                        src="https://i.pinimg.com/736x/55/0f/49/550f49a459548599a5a4ea1c67fc0244.jpg"
                        alt="avatar"
                      />
                    </a>
                    <div className="chat-about">
                      <h5>Huy Bui</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-history">
                <ul className="m-b-0">
                  <li className="clearfix">
                    <div className="message-data text-right">
                      <span className="message-data-time">23:10, hôm qua</span>
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="avatar"
                      />
                    </div>
                    <div className="message other-message float-right">
                      {" "}
                      Hi Huy?{" "}
                    </div>
                  </li>
                  <li className="clearfix active text-center">Hôm nay</li>
                  <li className="clearfix">
                    <div className="message-data">
                      <span className="message-data-time">10:12, hôm nay</span>
                    </div>
                    <div className="message my-message">Hi</div>
                  </li>
                  <li className="clearfix">
                    <div className="message-data">
                      <span className="message-data-time">10:15, hôm nay</span>
                    </div>
                    <div className="message my-message">
                      Chỗ bạn còn trống phòng không?
                    </div>
                  </li>
                </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type..."
                  />
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      {" "}
                      Gửi <i className="fa fa-send" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
