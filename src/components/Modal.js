function Modal({ isVisible, errorMsg }) {
  if (isVisible) {
    return (
      <div id="modal">
        <div id="modal-content" onClick={(e) => e.stopPropagation()}>
          <h1
            style={{
              textAlign: "center",
              padding: "10px",
              color: errorMsg ? "red" : "green",
            }}
          >
            {errorMsg ? errorMsg : "Form submitted successfully"}
          </h1>
        </div>
      </div>
    );
  }
}

export default Modal;
