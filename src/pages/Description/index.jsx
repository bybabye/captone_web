import { useContext, useEffect, useState } from "react";

import style from "./styles.module.css";
import { apiRequest } from "../../utils/request";
import Header from "../../components/Header"
import { PropTypes } from "prop-types";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
/*https://cap1.onrender.com/home?postId=64fec5432cd31a07815c0aca */
export default function DescriptionPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [postList, setPostList] = useState({});
    const { _id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPostList() {
            setIsLoading(true)
            try {
                const res = await axios.get(`https://cap1.onrender.com/home?postId=${_id}`)
                setPostList(res.data)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
            setIsLoading(false)

        }
        fetchPostList();
    }, []);


    return (

        <>
            <Header />
            {!isLoading ? <>
                <div className={styles.body}>
                    <div className={styles.container}>
                        <img className={styles.avt} src={
                            postList.images[0] ??
                            "https://nhatro.duytan.edu.vn/Content/Home/images/image_logo.jpg"
                        } alt="" />
                        <h1>{postList.roomType}</h1>
                        <p>Địa chỉ: {postList.address.stress}, {postList.address.subDistrict}, {postList.address.district}, {postList.address.city}.</p>
                        <h4>Giá cả: {postList.price} triệu/tháng</h4>
                        <p>Tiện ích: {postList.utilities.join(",\n")}</p>
                        <h2>Thông tin chi tiết:</h2>
                        {postList.des && postList.des.length > 0 ?
                            <ul>
                                {postList.des.map(item => <li>{item}</li>)}
                            </ul>
                            : <p>Chưa cập nhật</p>}
                        <h2>Người đăng tin:</h2>
                        {postList.status ?
                            <table>
                                <tr>
                                    <td>Họ và tên:</td>
                                    <td>{postList.ownerId.cID.fullName}</td>
                                </tr>
                                <tr>
                                    <td>Giới tính:</td>
                                    <td>{postList.ownerId.cID.sex}</td>
                                </tr>
                                <tr>
                                    <td>Số điện thoại:</td>
                                    <td>{postList.ownerId.cID.no}</td>
                                </tr>
                                <tr>
                                    <td>Quê quán:</td>
                                    <td>{postList.ownerId.cID.placeOfOrigin}</td>
                                </tr>
                                <tr>
                                    <td>Nơi ở hiện tại:</td>
                                    <td>{postList.ownerId.cID.placeOfResidence}</td>
                                </tr>
                            </table>
                            : <p>Chưa cập nhật</p>}
                            <button className={styles.contact} onClick={() => navigate(`/message/chat/${postList.ownerId._id}`)}>Liên hệ ngay</button>                          
                    </div>
                </div>
            </>
                : <h1>loading...</h1>}
        </>
    )
};

