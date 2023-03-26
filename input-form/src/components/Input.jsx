import React from "react";

const Input = (props) => {
  return (
    <div className="input-container">
      <input
        type={props.type}
        placeholder={props.showText}
        className={props.className || ""}
        autoFocus={props.autoFocus}
      />
      <span className="input-icon">{props.icon}</span>
    </div>
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
