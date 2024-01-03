import { useEffect, useState } from "react";
import { API_SERVER_LIST_USER } from "../../../utils/contants";
import { apiRequest } from "../../../utils/request";
import styles from "./styles.module.css";
import CircleAvatar from "../../../components/CircleAvatar";
import { useNavigate } from "react-router-dom";
export default function HomePageAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  function capitalizeFirstLetter(str) {
    if (!str || typeof str !== 'string') {
      return str;
    }
  
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  

  const handleListUser = async () => {
    setIsLoading(true);
    const { status, data } = await apiRequest(
      null,
      "GET",
      `${API_SERVER_LIST_USER}`,
      localStorage.getItem("accessToken")
    );
    setUser(data.data);
    console.log(data);
    setIsLoading(false);
  };

  useEffect(() => {
    handleListUser();
  }, []);
  return (
    <div className={`${styles.wrapper}`}>
      <table className={`${styles.userTable}`}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Avatar</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Full Name</th>
            <th>No</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td
                  style={{
                    color: "#323C47",
                    fontSize: 15,
                    fontWeight: "500",
                    letterSpacing: 0.15,
                    wordWrap: "break-word",
                  }}
                >
                  {capitalizeFirstLetter(user.userName)}
                </td>
                <td>{<CircleAvatar url={user.avatar} />}</td>

                <td>{user.phoneNumber}</td>
                <td>{user.sex}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: user.isBlocked ? "#FF3B47" : "#109CF1",
                    }}
                    className={` ${styles.des}`}
                    onClick={() => {}}
                  >
                    {user.isBlocked ? "Blocked" : "UnBlocked"}
                  </button>
                </td>
                <td>{user.cID.fullName}</td>
                <td>{user.cID.no}</td>
                <td>{user.roles}</td>

                <td>
                  <button className={`${styles.des}`} onClick={() => {
                    navigate(`/admin/${user._id}`)
                  }}>
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
     
    </div>
  );
}
