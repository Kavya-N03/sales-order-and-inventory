import {BrowserRouter as Router,Routes,Route } from "react-router-dom"
import CreateProduct from "./components/CreateProduct"
import Products from "./pages/Products"
import NavBar from "./components/NavBar"
import EditProduct from "./components/EditProduct"
import Inventory from "./pages/Inventory"
import Dealers from "./pages/Dealers"
import CreateDealer from "./components/CreateDealer"
import EditDealer from "./components/EditDealer"
import Orders from "./pages/Orders"
import CreateOrder from "./pages/CreateOrders"

function App(){
  return(
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/create-product" element={<CreateProduct/>}/>
        <Route path="/edit-product/:id" element={<EditProduct/>}/>
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/dealers" element={<Dealers/>}/>
        <Route path="/create-dealer" element={<CreateDealer/>}/>
        <Route path="/edit-dealers/:id" element={<EditDealer/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/create-order" element={<CreateOrder/>}/>
      </Routes>
    </Router>
   
  )

}
export default App