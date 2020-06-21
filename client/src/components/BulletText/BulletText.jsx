import PropTypes from "prop-types";
import React from "react";
import "./BulletText.scss";

BulletText.propTypes = {
  children: PropTypes.array.isRequired
};

export default function BulletText(props) {
  return(
    <div className="bullet">
      {props.children}
    </div>
  );
}