import { useEffect, useState } from "react";
import { getOrders, confirmOrder, deliverOrder } from "../api/orders";
import "../components/styles/orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [statusFilter, setStatusFilter] = useState("");
  const [searchDealer, setSearchDealer] = useState("");

  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
      setFilteredOrders(data);
    } catch {
      setError("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let data = [...orders];

    if (statusFilter) {
      data = data.filter(
        (o) => o.status.toLowerCase().trim() === statusFilter
      );
    }

    if (searchDealer.trim()) {
      const q = searchDealer.toLowerCase();
      data = data.filter((o) =>
        o.dealer_name.toLowerCase().includes(q)
      );
    }

    setFilteredOrders(data);
  }, [statusFilter, searchDealer, orders]);

  const handleConfirm = async (id) => {
    try {
      await confirmOrder(id);
      fetchOrders();
    } catch {
      alert("Failed to confirm order");
    }
  };

  const handleDeliver = async (id) => {
    try {
      await deliverOrder(id);
      fetchOrders();
    } catch {
      alert("Failed to deliver order");
    }
  };

  return (
    <div className="orders-container">

      <div className="filters-row">
        <input
          type="text"
          placeholder="Search dealer name..."
          className="search-input"
          value={searchDealer}
          onChange={(e) => setSearchDealer(e.target.value)}
        />

        <select
          className="filter-dropdown"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="confirmed">Confirmed</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {error && <p className="error-text">{error}</p>}

      {filteredOrders.map((order) => {
        const status = order.status.toLowerCase();

        return (
          <div key={order.id} className="order-card">

            <div className="order-header">
              <h3>#{order.order_number}</h3>
              <span className={`status status-${status}`}>
                {order.status}
              </span>
            </div>

            <p><strong>Dealer:</strong> {order.dealer_name}</p>
            <p><strong>Total Amount:</strong> ₹{order.total_amount}</p>

            <table className="order-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Line Total</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {order.items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.unit_price}</td>
                    <td>₹{item.line_total}</td>

                    <td>
                      {index === order.items.length - 1 && (
                        <>
                          {status === "draft" && (
                            <button
                              className="btn-confirm"
                              onClick={() => handleConfirm(order.id)}
                            >
                              Confirm
                            </button>
                          )}

                          {status === "confirmed" && (
                            <button
                              className="btn-deliver"
                              onClick={() => handleDeliver(order.id)}
                            >
                              Deliver
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Orders;