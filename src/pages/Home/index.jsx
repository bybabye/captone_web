import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { apiRequest } from "../../utils/request";
import Dropdown from "react-bootstrap/Dropdown";
import {
  API_SERVER_LIST_HOME,
  API_SERVER_LIST_NOTIFICATION,
  API_SERVER_SEARCH_FOR_ADDRESS,
  API_SERVER_SEARCH_FOR_ROOMTYPE,
} from "../../utils/contants";
import CustomCard from "../../components/CustomCard";
import logo from "../../assets/logo.png";
import CustomDropdown from "../../components/CustomDropdown";
import {
  BiSearchAlt,
  BiMessageRounded,
  BiUserCircle,
  BiHomeAlt2,
  BiLogOut,
} from "react-icons/bi";
import { BsPersonGear } from "react-icons/bs";

import { GrNotification } from "react-icons/gr";
import { MdPostAdd, MdApartment } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthProvider";
import app from "../../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import CustomLoading from "../../components/CustomLoading";
import Warning from "../../components/Warning/Warning";
import moment from "moment";
import { SiGoogletagmanager } from "react-icons/si";
export default function HomePage() {
  const [homes, setHomes] = useState([]);
  const [address, setAddress] = useState([]);
  const [postAddress, setPostAddress] = useState({});
  const [indexAddress, setIndexAddress] = useState(0);
  const [indexDistrict, setIndexDistrict] = useState(0);
  const [indexSubDistrict, setIndexSubDistrict] = useState(0);
  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //warning
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();

  //user khi da dang nhap
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenNotifi, setIsMenuOpenNotifi] = useState(false);
  //const [page, setPage] = useState(1);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleMenuNotifi = () => {
    setIsMenuOpenNotifi(!isMenuOpenNotifi);
  };

  const handleGetHomesData = async () => {
    const { status, data } = await apiRequest(
      null,
      "GET",
      API_SERVER_LIST_HOME,
      null
    );

    setHomes(data);
    setIsLoading(false);
  };
  const handleGetNotification = async () => {
    setIsLoading(true);
    const { status, data } = await apiRequest(
      null,
      "GET",
      API_SERVER_LIST_NOTIFICATION,
      localStorage.getItem("accessToken")
    );
    setNotification(data.data);
    console.log(data);
    setIsLoading(false);
  };

  const getAddressData = async () => {
    const response = await fetch("https://provinces.open-api.vn/api/?depth=3");
    const jsonData = await response.json();
    setAddress(jsonData);
    setPostAddress({
      city: jsonData[0].name,
    });
  };
  const handleCutString = (inputString, searchString) => {
    if (!inputString) return null;
    let startIndex;
    startIndex = inputString.indexOf(searchString);

    const result = inputString
      .substring(startIndex + searchString.length)
      .trim();
    return result;
  };

  const handleSearchHomeForAddress = async () => {
    const json = {
      city: handleCutString(postAddress.city, "Thành phố"),
      districts: handleCutString(postAddress.districts, "Quận"),
      subDistrict: handleCutString(postAddress.subDistrict, "Phường"),
    };
    console.log(json);
    setIsLoading(true);
    const { status, data } = await apiRequest(
      null,
      "GET",
      `${API_SERVER_SEARCH_FOR_ADDRESS}?subDistrict=${
        json.subDistrict ?? "undefined"
      }&district=${json.districts ?? "undefined"}&city=${json.city}`,
      null
    );
    // Sử lý sự kiện khi status khác 200

    setHomes(data);
    setIsLoading(false);
  };
  const handleSearchHomeForRoomType = async (roomType) => {
    setIsLoading(true);

    try {
      const { status, data } = await apiRequest(
        null,
        "GET",
        `${API_SERVER_SEARCH_FOR_ROOMTYPE}?roomType=${roomType}`,
        null
      );
      // Sử lý sự kiện khi status khác 200

      setHomes(data);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
      // Xử lý lỗi ở đây (nếu cần)
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    handleGetHomesData();
  }, []);
  useEffect(() => {
    handleGetNotification();
  }, []);
  useEffect(() => {
    getAddressData();
  }, []);

  if (user && user.roles === "admin") {
    return <Navigate to="/admin" />;
  }

  const itemCircle = (icon, text, func) => {
    return (
      <div onClick={func} className={`${styles.item_circle}`}>
        <div className={`${styles.item_circle_icon}`}>{icon}</div>
        <p>{text}</p>
      </div>
    );
  };

  return (
    <div className={`${styles.wrapper}`}>
      <Warning
        status={status}
        message={message}
        isActive={isActive}
        onClose={() => setIsActive(false)}
      />
      <div className={`${styles.menu}`}>
        <img src={logo} alt="IHML logo" />
        <div className={`${styles.menu_info}`}>
          <div style={{ display: "flex" }}>
            <CustomDropdown
              values={address}
              onSelect={(value) => {
                setIndexAddress(value);
                setPostAddress({
                  city: address[value].name,
                  districts: undefined,
                  subDistrict: undefined,
                });
              }}
            />

            {address[indexAddress] && (
              <CustomDropdown
                values={address[indexAddress].districts}
                onSelect={(value) => {
                  setIndexDistrict(value);
                  setPostAddress({
                    city: address[indexAddress].name,
                    districts:
                      address[indexAddress].districts[value].name ?? "",
                    subDistrict: undefined,
                  });
                }}
              />
            )}
            {address[indexAddress] && (
              <CustomDropdown
                values={
                  address[indexAddress].districts[indexDistrict].wards ?? []
                }
                onSelect={(value) => {
                  setIndexSubDistrict(value);
                  setPostAddress({
                    city: address[indexAddress].name,
                    districts:
                      address[indexAddress].districts[indexDistrict].name ?? "",
                    subDistrict:
                      address[indexAddress].districts[indexDistrict].wards[
                        value
                      ].name ?? "",
                  });
                }}
              />
            )}
            <button
              className={`${styles.menu_info_button}`}
              onClick={handleSearchHomeForAddress}
            >
              <BiSearchAlt color="#fff" />
              <p>Tìm kiếm</p>
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            {user._id && (
              <Dropdown show={isMenuOpenNotifi} onToggle={toggleMenuNotifi}>
                <GrNotification
                  onClick={toggleMenuNotifi}
                  style={{ marginLeft: "24px" }}
                  size={24}
                />
                <Dropdown.Menu>
                  {notification &&
                    notification.map((notifi) => (
                      <Dropdown.Item key={notifi._id} href={`/rental/${notifi.targetId}`}>
                        <div className={styles.notification}>
                          <div
                            style={{
                              color: notifi.read ? "#000" : "#050505",
                              fontWeight: notifi.read ? "400" : "600",
                              fontSize: "15px",
                            }}
                          >
                            {notifi.content}
                          </div>
                          <div>
                            {moment(notifi.updatedAt).format(
                              "DD/MM/YYYY HH:mm:ss"
                            )}
                          </div>
                        </div>
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            )}

            <Link to={`/message`}>
              <BiMessageRounded style={{ marginLeft: "12px" }} size={26} />
            </Link>
            {user._id != null ? (
              <Dropdown show={isMenuOpen} onToggle={toggleMenu}>
                <img
                  onClick={toggleMenu}
                  className={`${styles.user_img}`}
                  src={user.avatar}
                  alt="avatar"
                />
                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">
                    <BsPersonGear
                      style={{ marginRight: "6px" }}
                      fontSize={16}
                    />
                    View Personal
                  </Dropdown.Item>
                  {user.roles === "host" && (
                    <Dropdown.Item href="/rental">
                      <SiGoogletagmanager
                        style={{ marginRight: "6px" }}
                        fontSize={16}
                      />
                      Manager Rental
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item href="#" onClick={handleLogout}>
                    <BiLogOut style={{ marginRight: "6px" }} fontSize={16} />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to={`/login`}>
                <BiUserCircle
                  style={{ marginLeft: "12px", marginRight: "12px" }}
                  size={26}
                />
              </Link>
            )}

            <button
              className={`${styles.menu_info_button}`}
              onClick={() => {
                if (user.roles === "host") {
                  navigate("/post");
                } else {
                  setStatus(0);
                  setMessage("Bạn cần điền đầy đủ thông tin để trở thành host");
                  setIsActive(true);
                }
              }}
            >
              <MdPostAdd color="#fff" />
              <p>Đăng tin</p>
            </button>
          </div>
        </div>
      </div>
      <div className={`${styles.content}`}>
        <div className={`${styles.content_filter}`}>
          {itemCircle(<BiHomeAlt2 size={28} />, "Nhà Trọ & Phòng Trọ", () =>
            handleSearchHomeForRoomType(1)
          )}
          {itemCircle(<IoHomeOutline size={28} />, "Nhà Nguyên Căn", () =>
            handleSearchHomeForRoomType(2)
          )}
          {itemCircle(<MdApartment size={28} />, "Chung Cư", () =>
            handleSearchHomeForRoomType(3)
          )}
        </div>
        {isLoading ? <div>loading</div> : <CustomCard homes={homes} />}
      </div>
    </div>
  );
}
