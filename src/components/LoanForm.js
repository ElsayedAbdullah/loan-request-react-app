import { useEffect, useState } from "react";
import "./FormStyles.css";
import Modal from "./Modal.js";
import InputComp from "./InputComp.js";
import { inputLoanContext } from "../contexts/inputContext.js";

function LoanForm() {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [formInputs, setFormInputs] = useState({
    name: "",
    phone: "",
    age: "",
    isEmployee: false,
    salary: "Less than $500",
  });

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    setErrorMsg("");

    if (formInputs.age < 18 || formInputs.age > 100) {
      setErrorMsg("Age should be between 18 and 100");
    } else if (formInputs.phone.length < 10 || formInputs.phone.length > 12) {
      setErrorMsg("Phone should be between 10 and 12");
    }

    setShowModal(true);
  }

  const btnIsDisabled =
    formInputs.name === "" || formInputs.phone === "" || formInputs.age === "";

  function handleNameChange(value) {
    setFormInputs({ ...formInputs, name: value });
  }
  function handlePhoneChange(value) {
    setFormInputs({ ...formInputs, phone: value });
  }
  function handleAgeChange(value) {
    setFormInputs({ ...formInputs, age: value });
  }
  return (
    <div
      className="flex"
      onClick={() => {
        setShowModal(false);
      }}
    >
      <form id="loan-form">
        <h1 style={{ textAlign: "center" }}>Request Loan Form</h1>
        <hr />
        <inputLoanContext.Provider
          value={{
            label: "Name",
            value: formInputs.name,
            onChange: handleNameChange,
            type: "text",
          }}
        >
          <InputComp />
        </inputLoanContext.Provider>

        <inputLoanContext.Provider
          value={{
            label: "Phone Number",
            value: formInputs.phone,
            onChange: handlePhoneChange,
            type: "text",
          }}
        >
          <InputComp />
        </inputLoanContext.Provider>

        <inputLoanContext.Provider
          value={{
            label: "Age",
            value: formInputs.age,
            onChange: handleAgeChange,
            type: "number",
          }}
        >
          <InputComp />
        </inputLoanContext.Provider>

        <div
          className="form-group"
          style={{ display: "flex", gap: "10px", alignItems: "center" }}
        >
          <label>Are you an employee?</label>
          <input
            type="checkbox"
            style={{ width: "20px" }}
            checked={formInputs.isEmployee}
            onChange={(e) => {
              setFormInputs({ ...formInputs, isEmployee: e.target.checked });
            }}
          />
        </div>
        <div className="form-group">
          <label>Salary</label>
          <select
            value={formInputs.salary}
            onChange={(e) => {
              setFormInputs({ ...formInputs, salary: e.target.value });
            }}
          >
            <option>Less than $500</option>
            <option>Between $500 and $2000</option>
            <option>Above $2000</option>
          </select>
        </div>

        <button
          className={btnIsDisabled ? "disabled" : ""}
          disabled={btnIsDisabled}
          id="submit-loan-btn"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>

      <Modal className="modal" errorMsg={errorMsg} isVisible={showModal} />
    </div>
  );
}

export default LoanForm;
