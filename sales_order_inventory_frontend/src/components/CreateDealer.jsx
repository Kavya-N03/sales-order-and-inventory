import { useState } from "react";
import { postDealers } from "../api/dealers";
import "../components/styles/dealers.css"

function CreateDealer() {
  const [newDealer, setNewDealer] = useState({
    dealer_code: "",
    name: "",
    email: "",
    phone_number: "",
    address: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNewDealer({
      ...newDealer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postDealers(newDealer);
      alert("Dealer created successfully!");
      setNewDealer({
        dealer_code: "",
        name: "",
        email: "",
        phone_number: "",
        address: ""
      });
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="dealer-form-container">
      {error && <p className="error">{error}</p>}

      <form className="dealer-form" onSubmit={handleSubmit}>
        
        <label>
          Dealer Code
          <input
            type="text"
            name="dealer_code"
            value={newDealer.dealer_code}
            onChange={handleChange}
          />
        </label>

        <label>
          Name
          <input
            type="text"
            name="name"
            value={newDealer.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={newDealer.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Phone Number
          <input
            type="text"
            name="phone_number"
            value={newDealer.phone_number}
            onChange={handleChange}
          />
        </label>

        <label>
          Address
          <input
            type="text"
            name="address"
            value={newDealer.address}
            onChange={handleChange}
          />
        </label>
         <button type="submit" className="submit-btn">Create Dealer</button>

      </form>
    </div>
  );
}

export default CreateDealer;