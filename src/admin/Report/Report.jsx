import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

const API_SERVER = "https://cap1.onrender.com";
export const API_SERVER_GET_REPORT_USER = `${API_SERVER}/admin/list/report`;

function Report() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(API_SERVER_GET_REPORT_USER);
        setReports(response.data.data);
      } catch (error) {
        console.error("Error fetching reports", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="content container">
        <div className="row">
          <Header />
        </div>
        <div className="row" style={{ marginTop: "120px", marginLeft: "20px" }}>
          <table className="table w-100">
            <thead>
              <tr>
                <th>id</th>
                <th className="col">Tiêu đề</th>
                <th className="col">Objective</th>
                <th className="col">Trạng thái</th>
                <th className="col">Home Id</th>
                <th className="col">Người gửi</th>
                <th className="col">Created</th>
                <th className="col">Updated</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id}>
                  <td>{report._id}</td>
                  <td>{report.title}</td>
                  <td>{report.Objective}</td>
                  <td>{report.status}</td>
                  <td>{report.homeId}</td>
                  <td>{report.authorId}</td>
                  <td>{report.createdAt}</td>
                  <td>{report.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Report;
