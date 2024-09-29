import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>Sorry, but the page is not found...</h1>
      <Link to="/">
        Back home
      </Link>
    </div>
  );
}

export default NotFoundPage;