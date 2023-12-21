import styles from "../Styles.module.css";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { API_SERVER_LIST_USER } from "../../utils/contants";


function User() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_SERVER_LIST_USER);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleBlockUser = async (userId) => {
    try {
      await axios.post(`${API_SERVER_LIST_USER}/${userId}`);
      await fetchUsers();
      console.log(`User with ID ${userId} blocked successfully.`);
    } catch (error) {
      console.error("Error blocking user", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${API_SERVER_LIST_USER}/search/${encodeURIComponent(searchTerm)}`
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={`${styles.content} container`}>
        <div className="row">
          <Header />
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <form
            className="d-flex"
            role="search"
            style={{ width: "300px", marginLeft: "auto" }}
            onSubmit={handleSearch}
          >
            <input
              className={`form-control me-2 ${styles.searchInput}`}
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className={`btn btn-outline-success ${styles.searchButton}`}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
        <div className="row mt-3">
          <table className={`table ${styles.userTable}`}>
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
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.userName}</td>
                  <td>
                    {user.avatar && (
                      <img
                        src={user.avatar}
                        alt={`Avatar of ${user.userName}`}
                        className={styles.avatar}
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
                    {!user.isBlocked && (
                      <button
                        className={`btn btn-danger btn-sm ${styles.blockButton}`}
                        onClick={() => handleBlockUser(user._id)}
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;
