import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct} from "../api/products";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editProduct, setEditProduct] = useState({
    name: "",
    sku: "",
    price: "",
  });

  const [error, setError] = useState("");

  // Load single product
  const loadProduct = async () => {
    try {
      const product = await getProductById(id);

      setEditProduct({
        name: product.name,
        sku: product.sku,
        price: product.price,
      });
    } catch (err) {
      setError("Failed to load product");
    }
  };

  // Only call function inside useEffect
  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    setEditProduct({
      ...editProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProduct(id, {
        name: editProduct.name,
        sku: editProduct.sku,
        price: Number(editProduct.price),
      });

      navigate("/"); // back to product list
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h2>Edit Product</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            name="name"
            value={editProduct.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>SKU:</label>
          <input
            name="sku"
            value={editProduct.sku}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            name="price"
            type="number"
            value={editProduct.price}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Product</button>
      </form>
    </>
  );
}

export default EditProduct;