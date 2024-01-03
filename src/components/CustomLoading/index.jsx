
import { PacmanLoader } from "react-spinners";
export default function CustomLoading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width : "100vw",
        position: "fixed",
        backgroundColor: "#fff",
        opacity : ".9"
      }}
    >
      <PacmanLoader color="#000" loading={true} size={40} />
    </div>
  );
}
