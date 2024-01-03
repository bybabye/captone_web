import styles from "./styles.module.css";
import { GrFavorite } from "react-icons/gr";
import { CiLocationOn } from "react-icons/ci";

import {  useNavigate } from "react-router-dom";
export default function CustomCard({ homes }) {
  const navigate = useNavigate();
  const goToDescriptionPage = (homeId) => {
    navigate(`/description/${homeId}`)
  }
  return homes.map((home) => (
   
    <div onClick={() => goToDescriptionPage(home._id)} className={`${styles.card_item}`} key={home._id}>
      <img
        src={
          home.images[0] ??
          "https://nhatro.duytan.edu.vn/Content/Home/images/image_logo.jpg"
        }
        alt="image"
        className={styles.card_item_img}
      />
      
      <div className={styles.card_item_description}>
        <div className={styles.card_item_info}>
          <h3>
            {home.address.stress && `${home.address.stress} ,`}
            {home.address.subDistrict && `${home.address.subDistrict} ,`}
            {home.address.district && `${home.address.subDistrict} ,`}{" "}
            {home.address.city && `${home.address.city}.`}
          </h3>
          <p className={styles.card_item_roomType}>{home.roomType}</p>
          <p className={styles.card_item_price}>{home.price != 0 ? `${home.price} Triệu / Tháng` : `Đang update`} </p>
        </div>
        <div className={styles.card_item_info_favorite}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CiLocationOn />
            <p className={styles.card_item_location}> {home.address.city}</p>
          </div>
          <div>
            <GrFavorite />
          </div>
        </div>
      </div>
    </div>
  ));
}
