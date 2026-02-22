import { useNavigate } from "react-router-dom";
import "../components/styles/productcard.css";

function ProductList({ products, error, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="page-container">

      {error && <p className="error">{error}</p>}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => onEdit(product.id)}
                  >
                    ✏️
                  </button>

                  <button
                    className="action-btn delete-btn"
                    onClick={() => onDelete(product.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="create-btn-bottom-right">
        <button
          className="create-btn"
          onClick={() => navigate("/create-product")}
        >
          ✚ Create Product
        </button>
      </div>

    </div>
  );
}

export default ProductList;