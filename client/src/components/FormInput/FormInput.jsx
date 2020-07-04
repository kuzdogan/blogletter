import PropTypes from "prop-types";
import React from "react";
import "./FormInput.scss";

FormInput.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  className: PropTypes.string.isRequired
};

export default function FormInput (props) {
  return(
    <div className={props.className} {...props}>
      <h4>{props.title}</h4>
      {props.children}
    </div>
  );
}