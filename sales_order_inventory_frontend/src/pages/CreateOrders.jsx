import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/orders";
import "../components/styles/orders.css";

function CreateOrder() {
  const [dealerId, setDealerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitOrder = async () => {
    setError("");

    if (!dealerId) {
      setError("Enter dealer ID");
      return;
    }
    if (!productId) {
      setError("Enter product ID");
      return;
    }
    if (!quantity || Number(quantity) <= 0) {
      setError("Enter valid quantity");
      return;
    }

    const payload = {
      dealer: Number(dealerId),
      items: [
        {
          product: Number(productId),
          quantity: Number(quantity)
        }
      ]
    };

    try {
      await createOrder(payload);
      alert("Order placed! Check Orders page.");
      navigate("/orders");
    } catch (err) {
      setError("Order creation failed");
    }
  };

  return (
    <div className="order-form-container">
      <div className="order-form-card">

        <h2 className="form-title">Create Order</h2>

        {error && <p className="form-error">{error}</p>}

        <div className="form-group">
          <label>Dealer ID</label>
          <input
            type="number"
            value={dealerId}
            onChange={(e) => setDealerId(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Product ID</label>
          <input
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="form-input"
          />
        </div>

        <button onClick={submitOrder} className="submit-btn">
          Submit Order
        </button>
      </div>
    </div>
  );
}

export default CreateOrder;