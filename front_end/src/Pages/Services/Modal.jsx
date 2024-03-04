import React, { useState } from "react";
import "./Modal.css";

function Modal({
  handleSubmit,
  closeModal,
  serviceName,
  serviceDescription,
  serviceMax,
  serviceMin,
  servicePrice,
  onQuantityChange,
  onLinkChange,
  loading
}) {
  const [quantity, setQuantity] = useState(serviceMin);
  const [totalPrice, setTotalPrice] = useState(servicePrice);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * (servicePrice / 1000));
    onQuantityChange(newQuantity);
  };
  const handleLinkChange = (e) => {
    const newLink = e.target.value;
    onLinkChange(newLink);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <p className="modal-p">
          <strong>Service Name :</strong>
          <span> {serviceName}</span>
        </p>
        <p className="modal-p">
          <strong>Service Desciption :</strong>
          <span> {serviceDescription}</span>{" "}
        </p>
        <p className="modal-p">
          <strong>Minimum quantity :</strong> <span> {serviceMin}</span>
        </p>
        <p className="modal-p">
          <strong>Maximum quantity :</strong>
          <span> {serviceMax}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="Link">Link:</label>
          <input
            type="text"
            id="Link"
            name="Link"
            onChange={handleLinkChange}
          />
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min={serviceMin}
            max={serviceMax}
            onChange={handleQuantityChange}
          />
          <p className="modal-p">
            <strong>Price: </strong>
            <span>{totalPrice}</span>
          </p>

          <button type="submit" disabled={loading}>Submit Order</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
