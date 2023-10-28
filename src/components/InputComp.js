import React, { useContext } from "react";
import { inputLoanContext } from "../contexts/inputContext.js";

function InputComp() {
  const inputContext = useContext(inputLoanContext);
  return (
    <div className="form-group">
      <label>{inputContext.label}</label>
      <input
        type={inputContext.type}
        value={inputContext.value}
        onChange={(e) => inputContext.onChange(e.target.value)}
      />
    </div>
  );
}

export default InputComp;
