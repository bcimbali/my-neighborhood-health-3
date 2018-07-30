import React from "react";

const Card = props => (
  <div className="card mt-4 text-white transparent-bg">
    <div className="card-header text-center">
      <h3>
        <strong>
          <i className={`fa fa-${props.icon}`} aria-hidden="true" />{" "}
          {props.title}
        </strong>
      </h3>
    </div>
    <div className="card-body">{props.children}</div>
  </div>
);

export default Card;