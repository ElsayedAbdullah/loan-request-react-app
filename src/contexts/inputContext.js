import { createContext } from "react";

export const inputLoanContext = createContext({
  label: "",
  onChange: null,
  value: null,
  type: "",
});
