import React from "react";
import "./App.scss";
import FormInput from "./components/FormInput/";
import Navbar from "./components/Navbar";
import illustration from "./illustration.png";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="call-to-action">
        <div className="heading">
          <h1>Read through a blog as newsletters</h1>
          <h2>Receive articles of a blog starting from the first one until the latest one.</h2>
          <h2>Regularly in your mailbox.</h2>
        </div>
      </div>
      
      
      <div className="form-and-image">
        <div className="form-wrapper">
          <form>
            <FormInput title="Your Email" placeholder="john@mail.com"/>
            <FormInput title="Blog Address" placeholder="myfavblog.blogspot.com" />
          </form>
        </div>
        <div className="image-wrapper">
          <img src={illustration} alt="Illustration depicting Wordpress and Blogspot icons as newsletters"/>
        </div>
      </div>
      <div className="bullet-texts">

      </div>
    </div>
    
  );
}

export default App;
