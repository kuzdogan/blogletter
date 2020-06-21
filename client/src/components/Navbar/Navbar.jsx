import React from "react";
import icon from "../../mail-icon.png";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <header>
      <div className='navbar'>
        <img src={icon} className="icon" alt="blogletter icon"/>
        blogletter
      </div>
    </header>
  );
}