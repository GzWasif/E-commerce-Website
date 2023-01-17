import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="container">
        <div className="product py-2">
          <div className="details p-3">
            Page not found. Go to{" "}
            <Link to="/" replace>
              HOMEPAGE
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export { NotFound };
