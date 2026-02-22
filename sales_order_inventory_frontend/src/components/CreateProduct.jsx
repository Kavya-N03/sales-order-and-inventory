import { useState } from "react";
import { postProduct } from "../api/products";
import "../components/styles/createproduct.css"

function CreateProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    price: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postProduct(newProduct);
      setSuccess("Product created successfully");
      setNewProduct({ name: "", sku: "", price: "" });
    } catch (err) {
      setError(err.message || "Failed to create product");
    }
  };

  return (
    <div className="form-container">
      <h1>Add Product</h1>

      <form className="product-form" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <label>
          Name
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
          />
        </label>

        <label>
          SKU
          <input
            type="text"
            name="sku"
            value={newProduct.sku}
            onChange={handleChange}
          />
        </label>

        <label>
          Price (₹)
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default CreateProduct;