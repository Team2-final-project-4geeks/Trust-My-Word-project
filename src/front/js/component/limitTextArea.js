import React, { useState } from "react";

const TextAreaWithLimit = ({ maxLength }) => {
  const [text, setText] = useState("");
  
  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxLength) {
      setText(inputValue);
    }
  };

  const remainingChars = maxLength - text.length;

  return (
    <div>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={`Digit max ${maxLength} characters`}
        rows="4"
        cols="50"
      />
      <p>Remaining characters: {remainingChars}</p>
    </div>
  );
};

export default TextAreaWithLimit;