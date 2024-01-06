import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { CiCamera } from "react-icons/ci";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthProvider";
import Warning from "../../components/Warning/Warning";
import {
  API_SERVER_ADD_POST,
  API_SERVER_VALUATION,
} from "../../utils/contants";
import { apiRequest } from "../../utils/request";
import { useNavigate } from "react-router-dom";
export default function PostPage() {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedFurniture, setSelectedFurniture] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  //warning
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const furnitureOptions = {
    1: "điều hoà",
    2: "nóng lạnh",
    3: "tủ lạnh",
    4: "máy giặt",
    5: "tủ quần áo",
    6: "bếp",
    7: "wifi",
  };
  const handleCheckboxChange = (optionValue) => {
    if (selectAll) {
      setSelectedFurniture([]);
      setSelectAll(false);
    } else {
      const updatedSelection = [...selectedFurniture];

      if (updatedSelection.includes(optionValue)) {
        // Remove option if already selected
        updatedSelection.splice(updatedSelection.indexOf(optionValue), 1);
      } else {
        // Add option if not selected
        updatedSelection.push(optionValue);
      }

      setSelectedFurniture(updatedSelection);
    }
  };
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedFurniture(
      selectAll ? [] : Object.keys(furnitureOptions).map(Number)
    );
  };

  const [category, setCategory] = useState("Nhà Trọ & Phòng Trọ");
  const [address, setAddress] = useState("");
  const [furnitureStatus, setFurnitureStatus] = useState(0);
  const [area, setArea] = useState("");
  const [rentPrice, setRentPrice] = useState("");

  const [description, setDescription] = useState("");

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleValuation = async () => {
    const utilities = selectedFurniture.map((index) => furnitureOptions[index]);

    try {
      const { status, data } = await apiRequest(
        {
          area: area,
          roomType: "tro",
          utilities: utilities,
          status: furnitureStatus,
        },
        "POST",
        `${API_SERVER_VALUATION}`,
        null
      );
      setStatus(status);
      setMessage(
        `IHMLMarket gợi ý cho bạn là với giá là : ${
          Math.floor(data.data) / 1000
        } triệu VND`
      );
      setIsActive(true);
      setRentPrice(Math.floor(data.data) / 1000);
      console.log(status, data);
    } catch (error) {
      setStatus(0);
      setMessage(`Bạn cần nhập đủ điều kiện`);
      setIsActive(true);
    }
  };
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      uploadedImages.push({ file, imageUrl });
    }

    setImages([...images, ...uploadedImages]);
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handlePreviewClick = () => {
    setShowPreviewModal(true);
  };

  const handleClosePreviewModal = () => {
    setShowPreviewModal(false);
  };
  // Function to get form values
  // Function to get form values with image upload
  const getFormValuesWithImageUpload = async (
    selectedImages,
    selectedFurniture
  ) => {
    // Assuming `selectedImages` is an array of File objects representing the selected images

    // Upload images and obtain URLs
    const uploadImagesAndGetUrls = async () => {
      if (selectedImages.length > 0) {
        try {
          // Create a new FormData object and append each image
          const formDataImages = new FormData();
          console.log(selectedImages);
          for (const image of selectedImages) {
            formDataImages.append("images", image.file);
          }

          // Upload images to the server
          const response = await fetch("http://localhost:4000/upload", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: formDataImages,
          });

          if (response.ok) {
            // Parse the response to get the uploaded image URLs
            const result = await response.json();

            // Assuming each image has a corresponding URL in the response
            const imageUrls = result.data.map(
              (imageData) => `https://drive.google.com/uc?id=${imageData.id}`
            );

            return imageUrls;
          } else {
            // Handle the case when the image upload fails
            console.error("Image upload failed:", response.status);
            return null;
          }
        } catch (error) {
          console.error("Error uploading images:", error);
          return null;
        }
      } else {
        // Return an empty array if no images are selected
        setStatus(0);

        setMessage("Bạn cần tài hình lên trước khi đăng bài");
        setIsActive(true);
        return [];
      }
    };

    // Call the function to upload images and obtain URLs
    const imageUrls = await uploadImagesAndGetUrls();

    // Check if imageUrls is not null (upload successful)
    if (imageUrls !== null) {
      // Continue with the rest of the form values

      // Check if area, rentPrice, and deposit are greater than 0
      if (area <= 0 || rentPrice <= 0) {
        setStatus(0);

        setMessage("Bạn cần nhập đủ dữ liệu trước khi đăng");
        setIsActive(true);
        return null; // Return null if validation fails
      }

      // Return an object with form values, including the obtained image URLs
      const address1 = address.split(",");

      const customAddress = {
        stress: address1[0],
        subDistrict: address1[1],
        district: address1[2],
        city: address1[3],
      };

      const utilities = selectedFurniture.map(
        (index) => furnitureOptions[index]
      );
      return {
        roomType: category,
        address: customAddress,
        furnitureStatus: furnitureStatus,
        area,
        price: rentPrice,
        des: description,
        images: imageUrls,
        utilities: utilities,
      };
    } else {
      // Return null if image upload fails
      return null;
    }
  };

  // Usage in your component
  const handleSubmit = async () => {
    // Call the modified getFormValues function to retrieve form values
    setIsLoading(true);
    const formValues = await getFormValuesWithImageUpload(
      images,
      selectedFurniture
    );

    // Check if formValues is not null (validation and image upload passed)
    if (formValues) {
      // Perform further actions with formValues (e.g., API call, state update)
      console.log("Form Values:", formValues);

      const { status, data } = await apiRequest(
        formValues,
        "POST",
        `${API_SERVER_ADD_POST}`,
        localStorage.getItem("accessToken")
      );
      console.log(status, data);

      setStatus(status);
      setMessage(data.message);
      setIsActive(true);
      
      navigate("/");
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <>
      <Warning
        isActive={isActive}
        message={message}
        status={status}
        onClose={() => setIsActive(false)}
      />
      <div className={`${styles.wrapper} container`}>
        <Header user={user} />

        <h1>Đăng tin</h1>
        <div className="row">
          <div className="col-sm-4 mt-4">
            <label htmlFor="fileInput">
              <label htmlFor="exampleFormControlSelect1">Hình ảnh</label>
              <div className={`${styles.camera_button}`}>
                <CiCamera size={30} />
              </div>
              <input
                id="fileInput"
                type="file"
                name="images"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
                multiple
              />
            </label>
            {images.length > 0 && (
              <div>
                <h3 style={{ marginTop: "10px", fontSize: "15px" }}>
                  Ảnh đã thêm:
                </h3>
                <div className={styles.imageContainer}>
                  {images.map((image, index) => (
                    <div key={index} className={styles.imageWrapper}>
                      <img
                        src={image.imageUrl}
                        alt={`Image ${index}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleImageDelete(index)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="col-sm-8">
            <form>
              <div className="form-group mt-4">
                <label htmlFor="exampleFormControlSelect1">
                  Doanh mục đăng tin
                </label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Nhà Trọ & Phòng Trọ</option>
                  <option>Nhà Nguyên Căn</option>
                  <option>Chung Cư</option>
                </select>
              </div>
              <div className="form-group mt-4">
                <label htmlFor="exampleFormControlInput1">Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Đường 2 tháng 9, Hải Châu I, Đà Nẵng"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="form-group mt-4">
                <label htmlFor="validationServer03">Diện tích </label>
                <input
                  type="number"
                  className="form-control is-invalid"
                  id="validationServer03"
                  placeholder="Diện tích"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
                <div className="invalid-feedback">Vui lòng nhập diện tích</div>
                <div className="form-group mt-4">
                  <label htmlFor="exampleFormControlSelect1">
                    Tình trạng phòng
                  </label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    value={furnitureStatus}
                    onChange={(e) =>
                      setFurnitureStatus(parseInt(e.target.value))
                    }
                  >
                    <option value={0}>Cũ</option>
                    <option value={1}>Mới</option>
                  </select>
                </div>
                {/* check box*/}
                <div className={styles.checkboxContainer}>
                  <label className={styles.selectAllLabel}>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                    Nội thất đầy đủ
                  </label>
                  <br />
                  {Object.entries(furnitureOptions).map(([key, value]) => (
                    <div key={key}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={
                            selectAll || selectedFurniture.includes(value)
                          }
                          onChange={() => handleCheckboxChange(value)}
                        />
                        {value}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group mt-4">
                <input
                  type="number"
                  className="form-control is-invalid"
                  id="validationServer04"
                  placeholder="Giá cho thuê(VND)"
                  required
                  value={rentPrice}
                  onChange={(e) => setRentPrice(e.target.value)}
                />
                <div className="invalid-feedback">
                  Vui lòng nhập giá cho thuê
                </div>
              </div>
              <div className="form-group mt-4">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Mô tả chi tiết. Nên có: Loại phòng trọ, vị trí, diện tích, tình trạng,..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button
              type="button"
              className="btn btn-secondary btn-lg px-5 mx-2"
              onClick={handlePreviewClick}
            >
              Xem trước
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-lg px-5 mx-2"
              onClick={handleValuation}
            >
              Gợi ý giá
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg px-5 mx-2"
              onClick={handleSubmit}
            >
              Đăng tin
            </button>
          </div>
        </div>

        {/* Preview Modal */}
        <Modal show={showPreviewModal} onHide={handleClosePreviewModal}>
          <Modal.Header closeButton>
            <Modal.Title>Xem trước</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Hình ảnh đã tải lên:</h5>
            <div className={styles.imageContainer}>
              {images.map((image, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <img
                    src={image.imageUrl}
                    alt={`Image ${index}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleImageDelete(index)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>

            <h5>Thông tin liên quan:</h5>
            <ul>
              <li>
                Doanh mục đăng tin: <strong>{category}</strong>
              </li>
              <li>
                Địa chỉ: <strong>{address}</strong>
              </li>
              <li>
                Tinh trạng nội thất: <strong>{furnitureStatus}</strong>
              </li>
              <li>
                Diện tích: <strong>{area}</strong>
              </li>
              <li>
                Giá cho thuê: <strong>{rentPrice}</strong>
              </li>

              <li>
                Mô tả chi tiết: <strong>{description}</strong>
              </li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePreviewModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
