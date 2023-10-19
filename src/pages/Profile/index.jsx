export default function ProfilePage() {
  return (
    <div className="container-xl px-4 mt-4">
      <hr className="mt-0 mb-4" />
      <div className="row">
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              <img
                className="img-account-profile rounded-circle mb-2"
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt=""
              />

              <button className="btn btn-primary" type="button">
                Upload new image
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Edit Profile</div>
            <div className="card-body">
              <br />

              <div className="mb-3">
                <label>Tên nguời dùng</label>
                <input
                  className="form-control"
                  id="inputUsername"
                  type="text"
                  placeholder="Nhập tên nguời dùng"
                />
              </div>
              <div className="mb-3">
                <label>Địa chỉ</label>
                <input
                  className="form-control"
                  id="inputAddress"
                  type="text"
                  placeholder="Nhập địa chỉ"
                />
              </div>
              <div className="mb-3">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  id="inputPhone"
                  type="text"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <span>CID</span>
              <br />
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label>Họ</label>
                  <input
                    className="form-control"
                    id="inputFirstName"
                    type="text"
                    placeholder="Nhập họ của bạn"
                  />
                </div>

                <div className="col-md-6">
                  <label>Tên</label>
                  <input
                    className="form-control"
                    id="inputLastName"
                    type="text"
                    placeholder="Nhập tên của bạn"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label>NO</label>
                <input
                  className="form-control"
                  id="inputNO"
                  type="text"
                  placeholder={12345678904}
                />
              </div>
              <div className="mb-3">
                <label>Ngày sinh</label>
                <input
                  className="form-control date"
                  id="inputdate"
                  type="date"
                />
              </div>
              <div className="mb-3">
                <label>Quê quán</label>
                <input
                  className="form-control"
                  id="inputhometown"
                  type="text"
                  placeholder="Nhập quê quán"
                />
              </div>
              <div className="mb-3">
                <label>Nơi cư trú</label>
                <input
                  className="form-control"
                  id="inputresidence"
                  type="text"
                  name="Residence"
                  placeholder="Nhập nơi cư trú"
                />
              </div>
            </div>
            <div className="col text-center">
              <button className="btn btn-primary" type="button">
                Cập nhật
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
