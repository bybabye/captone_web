import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { apiRequest } from "../../utils/request";
import { API_SERVER_LIST_CHAT } from "../../utils/contants";
import { AuthContext } from "../../context/AuthProvider";
import { Link, Outlet } from "react-router-dom";

export default function Messages() {
  const [chats, setChats] = useState([]);
  const { user } = useContext(AuthContext);

  const handleListChat = async () => {
    const { data } = await apiRequest(
      null,
      "GET",
      API_SERVER_LIST_CHAT,
      localStorage.getItem("accessToken")
    );
    setChats(data);
  };

  useEffect(() => {
    handleListChat();
  }, []);

  const itemChat = (avatar, name, status, id) => {
    return (
      <div key={id}>
        <li className="clearfix">
          <img src={`${avatar}`} alt="avatar" />
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
    <div className="container ">
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
                {chats.map((chat) => {
                  const users = chat.membersId.find((e) => e._id !== user._id);
                  return (
                    <Link key={chat._id} to={`chat/${chat._id}`}>
                      {itemChat(
                        users.avatar,
                        users.userName,
                        "aloi",
                        users._id
                      )}
                    </Link>
                  );
                })}
              </ul>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
