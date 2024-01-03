import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import app from "../../firebase/config";
import { Navigate } from "react-router-dom";
import { apiRequest } from "../../utils/request";
import { API_SERVER_ADD_USER } from "../../utils/contants";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header";
export default function LoginPage() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  // add user with google
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkInputUser, setCheckInputUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifiError, setNotifiError] = useState("");
  const handleLoginWithGoogle = async () => {
    try {
      const {
        user: { uid, displayName, photoURL },
      } = await signInWithPopup(auth, provider);
      const data = await apiRequest(
        {
          userName: displayName,
          uid: uid,
          cmnd: uuidv4(),
          avatar: photoURL,
        },
        "POST",
        API_SERVER_ADD_USER,
        null
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLoginWithGmailAndPassword = async (event) => {
    event.preventDefault();
    if (checkInputUser) {
      setIsLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error);
        setNotifiError(error);
      } finally {
        setIsLoading(false);
      }
      setIsLoading(false);
    } else {
      setNotifiError("Invalid email or password");
    }
  };
  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/home/login=true" />;
  }
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className={`${styles.wrapper}`}>
      <Header user={null} />
      <div className={`${styles.layout}`}>
        <h1>Đăng nhập</h1>
        <p className="text-input">Email</p>
        <input
          value={email}
          onChange={(e) => {
            setCheckInputUser(true);
            setEmail(e.target.value);
          }}
          type="text"
          name="tenDangNhap"
          placeholder="email@gmail.com"
        ></input>
        <p className="text-input">Mật khẩu</p>
        <input
          onChange={(e) => {
            setCheckInputUser(true);
            setPassword(e.target.value);
          }}
          type="password"
          name="matKhau"
          placeholder="******"
        ></input>

        <div
          onClick={(e) => handleLoginWithGmailAndPassword(e)}
          style={{
            backgroundColor: `${!checkInputUser ? "grey" : "#1877f2"}`,
          }}
          className={`${styles.button}`}
        >
          <h5>Đăng nhập</h5>
        </div>
        <div className={`${styles.button}`}>
          <Link
            to={"/register"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h5>Đăng ký</h5>
          </Link>
        </div>
        {notifiError && (
          <div style={{ color: "red" }}>{notifiError.message}</div>
        )}
        <h1 style={{ color: "#7C838A" }}>- OR -</h1>

        <div className={`${styles.social_buttons}`}>
          {/* <div
            className={`${styles.google_button}`}
            onClick={handleLoginWithGoogle}
          ></div> */}
          <div
            onClick={handleLoginWithGoogle}
            style={{
              width: "200px",
              height: "45px",
              borderRadius: "15px",
              border: "1px #7C838A solid",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin : "12px"
            }}
          >
            {" "}
            <img src="./src/assets/google.png" alt="Google Icon" /> Login With
            Google
          </div>
          <div
            onClick={() => {}}
            style={{
              width: "200px",
              height: "45px",
              borderRadius: "15px",
              border: "1px #7C838A solid",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin : "12px"
            }}
          >
            {" "}
            <img src="./src/assets/meta.png" alt="Facebook Icon" /> Login With
            Facebook
          </div>
          <div className={`${styles.facebook_button}`}></div>
        </div>
      </div>
    </div>
  );
}
