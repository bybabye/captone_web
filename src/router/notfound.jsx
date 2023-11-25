import styles from "./notfound.css";
export default function NotFound() {
    return (
        <div>
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="error-template">
                <h1>
                  Oops!</h1>
                <h2>
                  404 Not Found</h2>
                <div className="error-details">
                  Sorry, an error has occured, Requested page not found!
                </div>
                <div className="error-actions">
                  <a href="http://localhost:5173/" className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home" /> Home  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}