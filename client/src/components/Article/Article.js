import React from "react";

const Article = ({ title, link}) => (
    <h3>
      <em>{title}</em>{" "}
      <span className="btn-group pull-right">
        <a
          className="btn btn-light text-white transparent-bg"
          href={link}
          rel="noopener noreferrer"
          target="_blank"
        >
        View Article
        </a>
      </span>
    </h3>
);

export default Article;
