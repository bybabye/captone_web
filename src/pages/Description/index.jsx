import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import Header from "../../components/Header";
import { apiRequest } from "../../utils/request";
import {
  API_SERVER_ADDCOMMENT_FOR_ID,
  API_SERVER_ADD_CHAT,
  API_SERVER_ADD_NOTIFICATION,
  API_SERVER_ADD_RENTAL,
  API_SERVER_SEARCH_FOR_ID,
} from "../../utils/contants";
// icon from react icon
import { CiTimer } from "react-icons/ci";
import { IoIosPricetag } from "react-icons/io";
import { CiHome } from "react-icons/ci";
import { AuthContext } from "../../context/AuthProvider";

import Warning from "../../components/Warning/Warning";

// eslint-disable-next-line no-unused-vars
import moment from "moment";
import CustomLoading from "../../components/CustomLoading";
import { useNavigate } from "react-router-dom";
import ReportPage from "../Report";

/*https://cap1.onrender.com/home?postId=64fec5432cd31a07815c0aca */
export default function DescriptionPage() {
  const [newComment, setNewComment] = useState("");
  const [chooseImage, setChooseImage] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [home, setHome] = useState();
  // warning
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  //lay param la 1 id cua san pham
  const { homeId } = useParams();
  // report
  const [show, setShow] = useState(false);

  //
  const { user } = useContext(AuthContext);

  console.log(homeId);
  const handleContactForHost = async () => {
    if (!user._id) {
      setStatus(0);
      setMessage("Bạn cần đăng nhập trước khi liên hệ");
      setIsActive(true);
    } else {
      setIsLoading(true);
      const { status, data } = await apiRequest(
        {
          senderId: user.uid,
        },
        "POST",
        `${API_SERVER_ADD_CHAT}`,
        localStorage.getItem("accessToken")
      );
      setIsLoading(false);

      navigate(`/message/chat/${data.data._id}`);
    }
  };
  const handleAddRental = async () => {
    if (!user._id) {
      setStatus(0);
      setMessage("Bạn cần đăng nhập trước khi muốn thuê phòng");
      setIsActive(true);
    } else {
      // vua gui notifi vua gui vao rental
      setIsLoading(true);

      const { status, data } = await apiRequest(
        {
          homeId: home._id,
          leasePeriod: 6,
          cost: home.price,
        },
        "POST",
        `${API_SERVER_ADD_RENTAL}`,
        localStorage.getItem("accessToken")
      );
      console.log(data);
      await apiRequest(
        {
          receiverId: home.ownerId._id,
          target: "rental",
          targetId: data.data,
          content: `${user.userName} đang muốn thuê ngôi nhà của bạn`,
        },
        "POST",
        `${API_SERVER_ADD_NOTIFICATION}`,
        localStorage.getItem("accessToken")
      );
      setIsLoading(false);
      setStatus(status);
      setMessage(data.message);
      setIsActive(true);

      // setTimeout(() => {
      //   navigate(`/`);
      // }, 1000);
    }
  };
  const handleAddComment = async () => {
    const { status, data } = await apiRequest(
      {
        content: newComment,
      },
      "POST",
      `${API_SERVER_ADDCOMMENT_FOR_ID}${homeId}`,
      localStorage.getItem("accessToken")
    );
    
    console.log(status, data);
    setNewComment("");
    setStatus(status);
    setMessage(data.message);
    setIsActive(true);
  };

  const handleSearchHomeForId = async () => {
    setIsLoading(true);
    const { status, data } = await apiRequest(
      null,
      "GET",
      `${API_SERVER_SEARCH_FOR_ID}${homeId}`,
      null
    );
    console.log(data);
    setHome(data);
    setComments(data.comments);
    setChooseImage(data.images[0]);
    setIsLoading(false);
  };
  // const sendNotificationForSocket = () => {
  //   const currentDate = new Date();
  //   socket.emit('send-notification',{
  //     'receiverId': user.uid,
  //     'targetId': null,
  //     'target' : null,
  //     'content' : "abcxyz"
  //   })
  // }

  useEffect(() => {
    handleSearchHomeForId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <CustomLoading />
  ) : (
    <div className={styles.houseDetailPage}>
      <Warning
        status={status}
        message={message}
        isActive={isActive}
        onClose={() => setIsActive(false)}
      />
      <ReportPage homeId={homeId} show={show} onClose={() => setShow(false)} />
      <Header user={user} />

      {/* <img
        src="https://scontent.fdad3-5.fna.fbcdn.net/v/t1.6435-9/60882175_1292921530883531_6196144495243821056_n.jpg?_nc_cat=102&cb=99be929b-8d691acd&ccb=1-7&_nc_sid=7a1959&_nc_ohc=0GBy325uN3AAX-9POfw&_nc_ht=scontent.fdad3-5.fna&oh=00_AfB98r7WufrwSjUszsVrrFqA5Mi9Nea3FZN4oWtLFA9e2g&oe=65B42AB1"
        alt="Image 2"
      /> */}

      <div className={styles.contentContainer}>
        <div className={styles.descriptionContainer}>
          <div className={styles.silderImage}>
            {home && <img src={chooseImage} alt="Image 2" />}
            {home && (
              <div className={styles.sliderItem}>
                {home.images.map((e, index) => (
                  <img
                    onClick={() => setChooseImage(e)}
                    key={index}
                    src={e}
                    alt="Image 2"
                  />
                ))}
              </div>
            )}
          </div>
          <div className={`${styles.detailView}`}>
            {home && (
              <h1 className={styles.title}>
                {home.address.stress && `${home.address.stress} ,`}
                {home.address.subDistrict && `${home.address.subDistrict} ,`}
                {home.address.district && `${home.address.subDistrict} ,`}{" "}
                {home.address.city && `${home.address.city}.`}
              </h1>
            )}
            <div className={`${styles.adDescription}`}>
              <IoIosPricetag color="#777" />{" "}
              <p>{home && home.price} triệu VND</p>
            </div>
            <div className={`${styles.adDescription}`}>
              <CiTimer color="#777" /> thoi gian dang
            </div>
            <div className={`${styles.adDescription}`}>
              <CiHome color="#777" /> {home && home.roomType}
            </div>
          </div>

          <div className={`${styles.detailView}`}>
            <h1>Contact the Owner:</h1>
            {home && (
              <div className={styles.ownerInfo}>
                <p>Name: {home.ownerId.userName}</p>

                <p>Phone: {home.ownerId.phoneNumber}</p>
                <div className={styles.commentActions}>
                  {user._id !== home.ownerId._id && (
                    <>
                      <div
                        className={styles.commentButton}
                        onClick={handleContactForHost}
                      >
                        Nhắn tin
                      </div>
                      <div
                        className={styles.commentButton}
                        // onClick={handleAddRental}
                        onClick={handleAddRental}
                      >
                        Thuê phòng
                      </div>
                      <div
                        className={styles.commentButton}
                        onClick={() => setShow(true)}
                      >
                        Báo cáo
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className={`${styles.detailView}`}>
            <h1>Mô tả chi tiết</h1>
            {home && home.des.map((e, index) => <p key={index}>{e}</p>)}
          </div>
          <div className={`${styles.detailView}`}>
            <h1>Comments</h1>

            {comments &&
              comments.map((comment) => (
                <div key={comment._id} className={styles.commentContainer}>
                  <img
                    src={comment.authorId.avatar}
                    alt="Avatar"
                    className={styles.avatar}
                  />
                  <div className={styles.commentContent}>
                    <div className={styles.commentText}>
                      <p className={styles.commentTextUserName}>
                        {comment.authorId.userName}
                      </p>
                      {comment.content}
                    </div>
                    {/* <div className={styles.commentTime}>{moment(message.sentTime).format('DD/MM/YYYY HH:mm:ss')}</div> */}
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.commentSection}>
            <div className={styles.commentInputContainer}>
              <textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="4"
                className={styles.commentInput}
              />
              <div className={styles.commentActions}>
                <div
                  className={styles.commentButton}
                  onClick={handleAddComment}
                >
                  Comment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
