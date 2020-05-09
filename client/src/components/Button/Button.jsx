import PropTypes from "prop-types";
import React from "react";
import "./Button.scss";

Button.propTypes = {
  children: PropTypes.string.isRequired
};

export default function Button(props){
  return(
    <button>{props.children}</button>
  );
}