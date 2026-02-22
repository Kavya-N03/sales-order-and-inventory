import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProducts,deleteProduct } from "../api/products"
import ProductList from "../components/ProductList"

function Products(){
    const navigate = useNavigate()
    const[products,setProducts] = useState([])
    const[error,setError] = useState("")

    const fetchProducts=async()=>{
        try{
            const data = await getProducts()
            setProducts(data) 
        }catch(err){
            setError("Network Error")
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[])

    const handleEdit = (id) => {
      navigate(`/edit-product/${id}`);
    };

    const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
    await deleteProduct(id);
    fetchProducts();  // refresh list after delete
    } catch {
    alert("Failed to delete product");
    }
   };

  
    return(
        <>
        <ProductList products={products} error={error} onEdit ={handleEdit} onDelete={handleDelete}/>
        
        </>
    )

}
export default Products