import { useEffect, useState } from "react";
import "./FormStyles.css";
import Modal from "./Modal.js";

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
  return (
    <div
      className="flex"
      style={{ height: "100vh" }}
      onClick={() => {
        setShowModal(false);
      }}
    >
      <form id="loan-form">
        <h1 style={{ textAlign: "center" }}>Request Loan Form</h1>
        <hr />
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={formInputs.name}
            onChange={(e) => {
              setFormInputs({ ...formInputs, name: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={formInputs.phone}
            onChange={(e) => {
              setFormInputs({ ...formInputs, phone: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            value={formInputs.age}
            onChange={(e) => {
              setFormInputs({ ...formInputs, age: e.target.value });
            }}
          />
        </div>
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
