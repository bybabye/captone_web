import styles from "./styles.module.css";
import image from "../../assets/404.png"
export default function ErrorPage() {
    return (
        <div className={`${styles.wrapper}`}>
       <img src={image} className={`${styles.error_image}`}/>
       <h3>Sorry , it looks like the page get lost</h3>
       <div className={`${styles.error_actions}`}>
                  <a href="http://localhost:5173/" className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home" /> Back to home  </a>
        </div>
      </div>
    );
}
