import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { apiRequest } from "../../utils/request";
import {
  API_SERVER_UPDATE_FOR_HOST,
  API_SERVER_UPDATE_PERSONAL_PROFILE,
} from "../../utils/contants";
import { useNavigate } from "react-router-dom";
import styles from "../Profile/styles.module.css";
import Header from "../../components/Header";
import Warning from "../../components/Warning/Warning";
export default function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [placeOfOrigin, setPlaceOfOrigin] = useState("");
  const [placeOfResidence, setPlaceOfResidence] = useState("");
  const [checkUserInput, setCheckUserInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(
    user && user.cID ? new Date(user.cID.dateOfBirth) : new Date()
  );
  // update images
  const [selectedImages, setSelectedImages] = useState(null);
  const [avatar, newAvatar] = useState(null);
  //warning
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedImages(files);
    if (files) {
      newAvatar(URL.createObjectURL(files[0]));
    }
  };

  // const handleUpload = async () => {
  //   const formData = new FormData();
  //   for (const image of selectedImages) {
  //     formData.append("images", image);
  //   }
  //   try {
  //     const response = await fetch("http://localhost:4000/upload", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //       body: formData,
  //     });

  //     const { data } = await response.json();
  //     console.log("Server response:", data[0].url);
  //   } catch (error) {
  //     console.error("Error uploading images", error);
  //   }
  // };
  const handleUpdateUserForHost = async () => {
    setIsLoading(true);
    const { status, data } = await apiRequest(
      null,
      "PATCH",
      API_SERVER_UPDATE_FOR_HOST,
      localStorage.getItem("accessToken")
    );

    setIsLoading(false);
    setStatus(status);

    setMessage(data.message);
    setIsActive(true);
  };
  const handleUpdateProfile = async () => {
    setIsLoading(true);
    let url = "";
    try {
      if (selectedImages) {
        const formData = new FormData();
        for (const image of selectedImages) {
          formData.append("images", image);
        }
        const response = await fetch("http://localhost:4000/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: formData,
        });
        const result = await response.json();
        url = `https://drive.google.com/uc?id=${result.data[0].id}`;
      }
      console.log(url);
      const { status, data } = await apiRequest(
        {
          userName,
          address,
          phoneNumber,
          fullName,
          avatar: url,
          placeOfOrigin,
          placeOfResidence,
          dateOfBirth,
        },
        "PATCH",
        API_SERVER_UPDATE_PERSONAL_PROFILE,
        localStorage.getItem("accessToken")
      );
      console.log(data);
      if(status != 200) {
        setStatus(status);

        setMessage(data.message);
        setIsActive(true);
       
        return;
      }
      
      newAvatar(data.data.avatar)
      setUser(data.data);
      setTimeout(() => {
        setIsLoading(false);
       
        navigate("/home/login=true");
        
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    console.log(selectedDate);
    setDateOfBirth(selectedDate);
  };

  return (
    <div className={`${styles.wrapper}`}>
      {console.log(status)}
      <Warning
        status={status}
        message={message}
        isActive={isActive}
        onClose={() => setIsActive(false)}
      />
      <div className="row">
        <Header user={user && user} />
      </div>
      <div className="container-xl">
        <div className="mt-5 mb-5">
          <div className="row">
            <div className="col-xl-4">
              <div className="card mb-5 ">
                <div
                  style={{ border: "1px solid #efefef" }}
                  className="card-header bg-white"
                >
                  Profile Picture
                </div>
                <div className="card-body text-center d-flex flex-column align-items-center">
                  <img
                    style={{ height: "100px", width: "100px" }}
                    className="img-account-profile rounded-circle mb-2"
                    src={avatar ?? user.avatar}
                    alt="avatar"
                  />
                  <div>
                    <label
                      htmlFor="fileInput"
                      className={`${styles.fileInputLabel}`}
                    >
                      Choose File
                    </label>
                  </div>
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    id="fileInput"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            {user && (
              <div className="col-xl-8">
                <div className="card mb-4">
                  <div
                    style={{ border: "1px solid #efefef" }}
                    className="card-header bg-white"
                  >
                    Edit Profile
                  </div>
                  <div className="card-body ">
                    <br />

                    <div className="mb-3">
                      <label>Tên nguời dùng</label>
                      <input
                        className="form-control mt-2"
                        id="inputUsername"
                        type="text"
                        placeholder={user.userName || ""}
                        value={userName || ""}
                        onFocus={() => {
                          if (userName == "") setUserName(user.userName);
                        }}
                        onChange={(e) => {
                          setCheckUserInput(true);
                          setUserName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Địa chỉ</label>
                      <input
                        className="form-control mt-2"
                        id="inputAddress"
                        type="text"
                        placeholder={user.address || ""}
                        value={address}
                        onFocus={() => {
                          if (address == "") setAddress(user.address);
                        }}
                        onChange={(e) => {
                          setCheckUserInput(true);
                          setAddress(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Số điện thoại</label>
                      <input
                        className="form-control mt-2"
                        id="inputPhone"
                        type="text"
                        placeholder={user.phoneNumber || ""}
                        value={phoneNumber || ""}
                        onFocus={() => {
                          if (phoneNumber == "")
                            setPhoneNumber(user.phoneNumber);
                        }}
                        onChange={(e) => {
                          setCheckUserInput(true);
                          setPhoneNumber(e.target.value);
                        }}
                      />
                    </div>
                    <span>CID</span>
                    <br />
                    {user.cID && (
                      <>
                        <div className="row gx-3 mb-3">
                          <div className="mb-3">
                            <label>Họ và Tên</label>
                            <input
                              className="form-control mt-2"
                              id="inputFirstName"
                              type="text"
                              placeholder={user.cID.fullName}
                              value={fullName || ""}
                              onFocus={() => {
                                if (fullName == "")
                                  setFullName(user.cID.fullName);
                              }}
                              onChange={(e) => {
                                setCheckUserInput(true);
                                setFullName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label>NO</label>
                          <input
                            className="form-control mt-2"
                            id="inputNO"
                            type="text"
                            placeholder={12345678904}
                            value={"***********"}
                          />
                        </div>
                        <div className="mb-3">
                          <label>Ngày sinh</label>
                          <input
                            className="form-control mt-2 date"
                            id="inputdate"
                            type="date"
                            value={dateOfBirth.toISOString().split("T")[0]} // Đảm bảo định dạng ngày tháng YYYY-MM-DD
                            onChange={handleDateChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label>Quê quán</label>
                          <input
                            className="form-control mt-2"
                            id="inputhometown"
                            type="text"
                            placeholder={user.cID.placeOfOrigin || ""}
                            value={placeOfOrigin}
                            onFocus={() => {
                              if (placeOfOrigin == "")
                                setPlaceOfOrigin(user.cID.placeOfOrigin);
                            }}
                            onChange={(e) => {
                              setCheckUserInput(true);
                              setPlaceOfOrigin(e.target.value);
                            }}
                          />
                        </div>
                        <div className="mb-3">
                          <label>Nơi cư trú</label>
                          <input
                            className="form-control mt-2"
                            id="inputresidence"
                            type="text"
                            name="Residence"
                            placeholder={user.cID.placeOfResidence || ""}
                            value={placeOfResidence}
                            onFocus={() => {
                              if (placeOfResidence == "")
                                setPlaceOfResidence(user.cID.placeOfResidence);
                            }}
                            onChange={(e) => {
                              setCheckUserInput(true);
                              setPlaceOfResidence(e.target.value);
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col text-center">
                    <button
                      onClick={handleUpdateProfile}
                      className={`btn ${
                        checkUserInput ? "btn-primary" : "btn-secondary"
                      }  mb-4`}
                      type="button"
                    >
                      Cập nhật
                    </button>{" "}
                    {user && user.roles !== "host" && (
                      <button
                        onClick={handleUpdateUserForHost}
                        className="btn btn-primary mb-4"
                        type="button"
                      >
                        Host
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
