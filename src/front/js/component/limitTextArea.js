import React, { useState } from "react";

const TextAreaWithLimit = ({ maxLength, maxRows, value, onChange }) => {
  const [text, setText] = useState(value);

  const handleChangeText = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxLength) {
      setText(inputValue);
      onChange && onChange(inputValue); // Chame a função onChange se fornecida
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const lines = text.split("\n");
      if (lines.length >= maxRows) {
        event.preventDefault();
      }
    }
  };

  const remainingChars = maxLength - text.length;

  return (
    <div>
      <textarea
        value={text}
        onChange={handleChangeText}
        onKeyDown={handleKeyPress}
        placeholder={`Digit max ${maxLength} characters`}
        rows={maxRows}
      />
      <p>Remaining characters: {remainingChars}</p>
    </div>
  );
};

export default TextAreaWithLimit;