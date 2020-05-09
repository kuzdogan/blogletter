import React from "react";
import "./App.scss";
import BulletText from "./components/BulletText";
import Button from "./components/Button";
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
            <Button>Sign Up</Button>
          </form>
        </div>
        <div className="image-wrapper">
          <img src={illustration} alt="Illustration depicting Wordpress and Blogspot icons as newsletters"/>
        </div>
      </div>
      <div className="bullet-texts">
        <ul style={{padding: 0, listStyle: "none"}}>
          <BulletText>
            <li>Great minds write great stuff. But you can’t read them at once.</li>
            <span>Read the blogs in a digestable way. Every day, every week, however you like.</span>
          </BulletText>
          <BulletText>
            <li>People build on thoughts. It’s easy to miss things out.</li>
            <span>We will send you the articles in a chronological order so that you will grasp the stream of conciousness of the author.  Not random articles.</span>
          </BulletText>
        </ul>
      </div>
    </div>
    
  );
}

export default App;
