import { Link } from "react-router-dom";
import "../components/styles/navbar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Products</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/dealers">Dealers</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/create-order">Create Order</Link>
      </div>
    </nav>
  );
}

export default NavBar;