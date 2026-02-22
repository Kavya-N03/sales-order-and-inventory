import { BASE_URL } from "../config";

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}products/`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}products/${id}/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to load product");
  }

  return response.json();
};

export const postProduct = async (data) => {
  const response = await fetch(`${BASE_URL}products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.message || "Failed to create product");
  }
  return response.json();
};

export const updateProduct=async(id,data)=>{
  const response = await fetch(`${BASE_URL}products/${id}/`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  });

  if(!response.ok){
    const err = await response.json();
    throw new Error(err?.message || "Failed to create product");
  }
  return response.json()
}

export const deleteProduct=async(id)=>{
  const response = await fetch(`${BASE_URL}products/${id}/`,{
    method:"DELETE",
  });
  if(!response.ok){
    throw new Error("Failed to delete product")
  }
  return true;
}

//INVENTORY API
export const getInventory=async()=>{
  const response = await fetch(`${BASE_URL}inventory/`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    }
  });
  if(!response.ok){
    throw new Error("Failed to fetch inventory data")
  }
  return response.json()
}
