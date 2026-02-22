import { useEffect, useState } from "react";
import { getInventory } from "../api/products";
import "../components/styles/inventory.css";

function Inventory() {
  const [invData, setInvData] = useState([]);
  const [error, setError] = useState("");

  const fetchInventory = async () => {
    try {
      const data = await getInventory();
      setInvData(data);
    } catch (err) {
      setError("Network Error");
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="inventory-wrapper">
      {error && <p className="error">{error}</p>}

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Stock (Quantity)</th>
            <th>Updated By</th>
          </tr>
        </thead>

        <tbody>
          {invData.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-data">No inventory data found</td>
            </tr>
          ) : (
            invData.map((inv) => (
              <tr key={inv.id || inv.product_name}>
                <td>{inv.product_name}</td>
                <td>{inv.quantity}</td>
                <td>{inv.updated_by}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;