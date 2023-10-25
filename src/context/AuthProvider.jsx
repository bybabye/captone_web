import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { apiRequest } from "../utils/request";
import { API_SERVER_LOGIN_USER } from "../utils/contants";
/**
 * Đây là lớp bảo vệ
 * children là các page phải trả qua được lớp này mới vào các router các
 *
 */

//Tạo một React Context có tên AuthContext để chia sẻ thông tin xác thực trong ứng dụng.

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  // tạo biến lưu trữ user
  const [user, setUser] = useState({});
  // tạo biến loading khi user người dùng vừa vào trang
  const [isLoading, setIsLoading] = useState(false);
  // tạo biến navigate để di chuyển đến các router
  // tạo biến auth , getAuth là 1 hàm hỗ trợ kết nối tới firebase
  const auth = getAuth();

  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged( async (user) => {
    // Nếu người dùng đã đăng nhập lập tức get thông tin về và đăng nhập vào hệ thống
      if (user?.uid) {
        
        const userApp = await apiRequest(null,"POST",API_SERVER_LOGIN_USER,user.accessToken);
        setUser(userApp);
        if (user.accessToken !== localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", user.accessToken);
          window.location.reload();
        }
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setUser({});
      localStorage.clear();
    });
    return () => {
      unsubcribed();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <div>Loading</div> : children}
    </AuthContext.Provider>
  );
}
