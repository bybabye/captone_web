import { GoogleAuthProvider,getAuth, signInWithPopup } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import app from "../../firebase/config";
import { Navigate } from "react-router-dom";
import { apiRequest } from "../../utils/request";
import { API_SERVER_ADD_USER } from "../../utils/contants";
//import styles from "./styles.module.css";
export default function LoginPage() {
  
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const handleLoginWithGoogle = async () => {
    try {
      const {
        user: { uid, displayName,photoURL },
      } = await signInWithPopup(auth, provider);
      const data = await apiRequest({
        userName : displayName,uid : uid, cmnd : uuidv4(), avatar : photoURL
      },"POST",API_SERVER_ADD_USER,null)
  
      console.log(data);
    } catch (error) {
      console.log(error);
    }

  }
  if(localStorage.getItem("accessToken")) {
    return <Navigate to="/home/login=true" />;
  }
  return (
    <div>
      <button onClick={handleLoginWithGoogle}>alo</button>
    </div>
  );
}
