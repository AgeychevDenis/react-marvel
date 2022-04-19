import ErrorMessage from "../error-message/error-message";
import { Link } from "react-router-dom";

const Page404 = () => {
   return (
      <div>
         <ErrorMessage />
         <p className="container" style={{ "textAlign": "center" }}>
            <Link to="/">Back to main page
            </Link>
         </p>
      </div>
   )
}

export default Page404;