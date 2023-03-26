import React, { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import { AiOutlineWarning } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import "./styles.css";

const InputForm = () => {
  const [error, setError] = useState("");
  const validateForm = (e) => {
    e.preventDefault();
    console.log("Form is submitted.");
    if (e.target[0].value || e.target[1].value || e.target[2].value === "") {
      setError("Some fields are required");
    } else {
      console.log(e.target[0].value);
      console.log(e.target[1].value);
      console.log(e.target[2].value);
    }
  };

  return (
    <div className="form-page">
      <form className="input-form" onSubmit={validateForm}>
        <h1>Input Form</h1>
        <Input
          autoFocus
          showText="Full name"
          icon={<AiOutlineUser size={20} />}
        />
        <Input
          type="email"
          showText="Email address"
          icon={<MdOutlineMail size={20} />}
        />
        <Input
          type="password"
          showText="Password"
          icon={<IoMdKey size={20} />}
        />
        <Input className="message-text" showText="Write your message." />
        {error && (
          <div className="error-box">
            <AiOutlineWarning />
            <span>{error}</span>
          </div>
        )}
        <Button type="submit" />
      </form>
    </div>
  );
};

export default InputForm;
