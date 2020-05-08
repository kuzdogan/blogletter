import PropTypes from "prop-types";
import React from "react";
import "./FormInput.scss";

FormInput.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default function FormInput (props) {
  return(
    <div className="form-input">
      <h4>{props.title}</h4>
      <input placeholder={props.placeholder}/>
    </div>
  );
}