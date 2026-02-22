import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDealerById, updateDealer } from "../api/dealers";
import "../components/styles/dealers.css"; 

function EditDealer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editDealer, setEditDealer] = useState({
    dealer_code: "",
    name: "",
    email: "",
    phone_number: "",
    address: ""
  });

  const [error, setError] = useState("");

  const loadDealer = async () => {
    try {
      const dealer = await getDealerById(id);
      setEditDealer({
        dealer_code: dealer.dealer_code,
        name: dealer.name,
        email: dealer.email,
        phone_number: dealer.phone_number,
        address: dealer.address
      });
    } catch (err) {
      setError("Failed to load dealer data");
    }
  };

  useEffect(() => {
    if(id){
    loadDealer();
    }
  }, [id]);

  const handleChange = (e) => {
    setEditDealer({
      ...editDealer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDealer(id, editDealer);
      alert("Dealer updated successfully!");
      navigate("/dealers"); 
    } catch (err) {
      setError("Failed to update dealer");
    }
  };

  return (
    <div className="dealer-form-container">
      {error && <p className="error">{error}</p>}

      <h2>Edit Dealer</h2>

      <form className="dealer-form" onSubmit={handleSubmit}>
        <label>
          Dealer Code
          <input
            type="text"
            name="dealer_code"
            value={editDealer.dealer_code}
            onChange={handleChange}
          />
        </label>

        <label>
          Name
          <input
            type="text"
            name="name"
            value={editDealer.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={editDealer.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Phone Number
          <input
            type="text"
            name="phone_number"
            value={editDealer.phone_number}
            onChange={handleChange}
          />
        </label>

        <label>
          Address
          <input
            type="text"
            name="address"
            value={editDealer.address}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="dealer-submit-btn">
          Update Dealer
        </button>
      </form>
    </div>
  );
}

export default EditDealer;