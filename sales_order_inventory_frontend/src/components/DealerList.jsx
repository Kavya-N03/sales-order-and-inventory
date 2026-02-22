import { useNavigate } from "react-router-dom";
import "../components/styles/dealers.css";

function DealerList({ dealers, error, onEdit }) {
  const navigate = useNavigate();

  return (
    <div className="page-container">

      {error && <p className="error">{error}</p>}

      <div className="table-wrapper">
        <table className="dealer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Dealer Code</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {dealers.map((dealer) => (
              <tr key={dealer.id}>
                <td>{dealer.id}</td>
                <td>{dealer.dealer_code}</td>
                <td>{dealer.name}</td>
                <td>{dealer.email}</td>
                <td>{dealer.phone_number}</td>
                <td>{dealer.address}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(dealer.id)}>
                    ✏️
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
          onClick={() => navigate("/create-dealer")}
        >
          ✚ Create Dealer
        </button>
      </div>

    </div>
  );
}

export default DealerList;