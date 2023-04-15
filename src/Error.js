import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <article className="error-page flex-col">
      <h1>Opps... There's nothing there</h1>
      <div>
        <Link to="/" className="btn-main blue-main">
          Back
        </Link>
      </div>
    </article>
  );
};

export default Error;
