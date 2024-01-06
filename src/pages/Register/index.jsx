import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Header from "../../components/Header";
import { API_SERVER_ADD_USER } from "../../utils/contants";
import { apiRequest } from "../../utils/request";
import styles from "./styles.module.css";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import app from "../../firebase/config";
export default function RegisterPage() {
  const [email1, setEmail1] = useState("");
  const [password, setPassword] = useState("");
  const [notifiError, setNotifiError] = useState("");
  const auth = getAuth(app);

  const handleRegister = async () => {
    try {
      const {
        user: { uid, email, photoURL, userName },
      } = await createUserWithEmailAndPassword(auth, email1, password);

      const data = await apiRequest(
        {
          userName: userName,
          uid: uid,
          cmnd: "",
          avatar: photoURL,
        },
        "POST",
        API_SERVER_ADD_USER,
        null
      );
      console.log("Đăng ký thành công");
      console.log(data);
    } catch (error) {
     setNotifiError( error);
    }
  };
  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/home/login=true" />;
  }
  return (
    <div className={`${styles.wrapper}`}>
      <Header user={null} />
      <div className={`${styles.layout}`}>
        <h1>Tạo tài khoản</h1>
        <p>Gmail đăng ký</p>
        <input
          type="text"
          name="email"
          placeholder=""
          onChange={(e) => {
            setEmail1(e.target.value);
          }}
        ></input>
        <p>CCCD/CMND</p>
        <input type="phonenumber" name="dinhDanh" placeholder=""></input>
        <p>Mật khẩu</p>
        <input
          type="password"
          name="matKhau"
          placeholder=""
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <p>Nhập lại mật khẩu</p>
        <input
          type="password"
          name="nhapLaiMatKhau"
          placeholder=""
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        {notifiError && (
          <div style={{ color: "red" }}>{notifiError.message}</div>
        )}
        <div onClick={handleRegister} className={`${styles.button}`}>
          <h5>Đăng ký</h5>
        </div>
      </div>
    </div>
  );
}
