import React from "react";
import Button from "../Button";
import FormInput from "../FormInput";

export default function Form(){
  return(
    <div className="form-wrapper">
      <form>
        <FormInput title="Your Email" placeholder="john@mail.com" />
        <FormInput title="Blog Address" placeholder="myfavblog.blogspot.com" />
        <FormInput title="Your Name (optional)" placeholder="John Doe" />
        <Button>Sign Up</Button>
      </form>
    </div>
  );
}