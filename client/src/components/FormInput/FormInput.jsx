import PropTypes from "prop-types";
import React from "react";
import "./FormInput.scss";

FormInput.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
};

export default function FormInput (props) {
  return(
    <div className="form-input" {...props}>
      <h4>{props.title}</h4>
      {props.children}
    </div>
  );
}