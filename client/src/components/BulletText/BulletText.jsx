import PropTypes from "prop-types";
import React from "react";
import "./BulletText.scss";

BulletText.propTypes = {
  children: PropTypes.string.isRequired
};

export default function BulletText(props) {
  return(
    <div className="bullet">
      {props.children}
    </div>
  );
}