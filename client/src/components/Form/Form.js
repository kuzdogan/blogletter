import React, { useState } from "react";
import Button from "../Button";
import FormInput from "../FormInput";
import "./Form.scss";
import WeekdaySelector from "./WeekdaySelector";

export default function Form(){
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div className="form-inputs-wrapper">
      <form>
        <FormInput onFocus={() => setExpanded(true)} title="Your Email" >
          <input placeholder="john@mail.com" />
        </FormInput>
        <FormInput onFocus={() => setExpanded(true)} title="Blog Address" >
          <input placeholder="myfavblog.blogspot.com" />
        </FormInput>
        <FormInput style={{ display: isExpanded ? "inherit" : "none" }} title="Your Name (optional)">
          <input placeholder="John Doe" />
        </FormInput>
        <FormInput title="Frequency" >
          <span className="description">Every week on these days:</span>
          <WeekdaySelector/>
        </FormInput>
        <Button>Sign Up</Button>
      </form>
    </div>
  );
}