import Header from "../../components/Header";
import styles from "./styles.module.css";
export default function RegisterPage() {
   

    
    

    // const handleRegister = async () => {
    //     try {
    //         const {
    //             user: { uid, email },
    //         } = await createUserWithEmailAndPassword(auth, user.email, user.matKhau);
            
    //         const data = await apiRequest({
    //             userName: email, uid: uid, cmnd: "", avatar: "",
    //         }, "POST", API_SERVER_ADD_USER, null);
    //         console.log("Đăng ký thành công");
    //         console.log(data);

    //         history.push("/login");
    //     } catch (error) {
    //         console.error("Đăng ký thất bại", error);
    //     }
    // };
    
    return (
        <div className={`${styles.wrapper}`}>
            <Header user={null}/>
            <div className={`${styles.layout}`}>
            <h1>Tạo tài khoản</h1>
            <p>Gmail đăng ký</p>
            <input type="text" name="email" placeholder="" onChange={() => {}}></input>
            <p>CCCD/CMND</p>
            <input type="phonenumber" name="dinhDanh" placeholder=""></input>
            <p>Mật khẩu</p>
            <input type="password" name="matKhau" placeholder="" onChange={() => {}}></input>
            <p>Nhập lại mật khẩu</p>
            <input type="password" name="nhapLaiMatKhau" placeholder="" onChange={() => {}}></input>
            <div className={`${styles.button}`} >
                <h5>Đăng ký</h5>
            </div>
        </div>
        </div>
    );
}
