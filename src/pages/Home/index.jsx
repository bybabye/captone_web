import { getAuth, signOut } from "firebase/auth";
import app from "../../firebase/config";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function HomePage() {
  const auth = getAuth(app);
  const data = useContext(AuthContext);
  console.log(data);
  const handleLogout = async () => {
    console.log("da log out");
    
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
      localStorage.clear();
  };

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
