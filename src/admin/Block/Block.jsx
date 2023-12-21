import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import {
  API_SERVER_LIST_USER,
  API_SERVER_GET_UNBLOCK_USER,
} from "../../utils/contants";
import styles from "./styles.module.css";

function Block () {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBlockedUsers = async () => {
    try {
      const response = await axios.get(API_SERVER_LIST_USER);
      setBlockedUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching blocked users", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${API_SERVER_LIST_USER}?partialUsername=${encodeURIComponent(
          searchTerm
        )}`
      );
      setBlockedUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching blocked users", error);
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      await axios.post(`${API_SERVER_GET_UNBLOCK_USER}/${userId}`);
      await fetchBlockedUsers();
      console.log(`User with ID ${userId} unblocked successfully.`);
    } catch (error) {
      console.error("Error unblocking user", error);
    }
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={`${styles.container} container`}>
        <div className="row">
          <Header />
        </div>

        <div className="row" style={{ marginTop: "120px", marginLeft: "20px" }}>
          <form
            className={`d-flex ${styles.searchForm}`}
            role="search"
            onSubmit={handleSearch}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <div className={`${styles.tableWrapper}`}>
            <table className="table w-100">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Avatar</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Gender</th>
                  <th>Full Name</th>
                  <th>No</th>
                  <th>Role</th>
                  <th>Hometown</th>
                  <th>Current Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blockedUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.userName}</td>
                    <td>
                      {user.avatar && (
                        <img
                          src={user.avatar}
                          alt={`Avatar of ${user.userName}`}
                          className={`${styles.avatar} avatar`}
                        />
                      )}
                    </td>
                    <td>{user.address}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.sex}</td>
                    <td>{user.cID.fullName}</td>
                    <td>{user.cID.no}</td>
                    <td>{user.roles}</td>
                    <td>{user.cID.placeOfOrigin}</td>
                    <td>{user.cID.placeOfResidence}</td>
                    <td>
                      <button onClick={() => handleUnblockUser(user._id)}>
                        Unblock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Block;
