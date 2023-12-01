import "./User.css";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";

const API_SERVER = "https://cap1.onrender.com"; 
const API_SERVER_LIST_USER = `${API_SERVER}/user/listUser`;
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

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${API_SERVER_LIST_USER}?partialUsername=${encodeURIComponent(searchTerm)}`
      );
      setUsers(response.data.data);
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
      <div className="content container">
        <div className="row">
          <Header />
        </div>

        <div className="row" style={{ marginTop: "120px", marginLeft: "20px" }}>
          <form
            className="d-flex"
            role="search"
            style={{ width: "300px", marginLeft: "1000px" }}
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
          <table className="table w-100" style={{ marginTop: "15px" }}>
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">userName</th>
                <th scope="col">Avatar</th>
                <th scope="col">Address</th>
                <th scope="col">PhoneNumber</th>
                <th scope="col">Sex</th>
                <th scope="col">FullName</th>
                <th scope="col">No</th>
                <th scope="col">roles</th>
                <th scope="col">PlaceofOrigin</th>
                <th scope="col">PlaceofResidence</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.userName}</td>
                  <td>
                    {" "}
                    {user.avatar && (
                      <img
                        src={user.avatar}
                        alt={`Avatar of ${user.userName}`}
                        className="avatar"
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
