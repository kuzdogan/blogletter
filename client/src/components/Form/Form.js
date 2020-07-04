import React, { useState } from "react";
import Button from "../Button";
import FormInput from "../FormInput";
import "./Form.scss";
import WeekdaySelector from "./WeekdaySelector";

export default function Form(){
  const [isExpanded, setExpanded] = useState(false);
  const [isActiveDays, setIsActiveDays] = useState([1,1,1,1,1,0,0]); // Starting from Monday, weekdays active.
  
  const toggleActiveDay = (i) => {
    console.log("Toggling day ", i);
    let tempIsActiveDays = [...isActiveDays];
    isActiveDays[i] ? tempIsActiveDays[i] = false : tempIsActiveDays[i] = true;
    setIsActiveDays(tempIsActiveDays);
  };

  return (
    <div className="form-inputs-wrapper">
      <form>
        <FormInput className="form-input" onFocus={() => setExpanded(true)} title="Your Email" >
          <input placeholder="john@mail.com" />
        </FormInput>
        <FormInput className="form-input" onFocus={() => setExpanded(true)} title="Blog Address" >
          <input placeholder="myfavblog.blogspot.com" />
        </FormInput>
        <FormInput className={"form-input " + (isExpanded ? "" : "hidden")} title="Your Name (optional)">
          <input placeholder="John Doe" />
        </FormInput>
        <FormInput title="Frequency" className={"form-input " + (isExpanded ? "" : "hidden")}>
          <span className="description">Every week on these days:</span>
          <WeekdaySelector 
            isActiveDays={isActiveDays}
            toggleActiveDay={toggleActiveDay}
          />
        </FormInput>
        <Button>Sign Up</Button>
      </form>
    </div>
  );
}