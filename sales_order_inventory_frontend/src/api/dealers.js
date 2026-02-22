import { BASE_URL } from "../config";

export const getDealers=async()=>{
    const response = await fetch(`${BASE_URL}dealers/`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(!response.ok){
        throw new Error("Failed to fetch dealers data")
    }
    return response.json()
}

export const postDealers=async(data)=>{
    const response = await fetch(`${BASE_URL}dealers/`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    if(!response.ok){
        throw new Error("Failed to create dealers")
    }
    return response.json()
}

export const updateDealer=async(id,data)=>{
    const response = await fetch(`${BASE_URL}dealers/${id}/`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    if(!response.ok){
        throw new Error("Failed to update dealer")
    }
    return response.json()
}

export const getDealerById = async (id) => {
  const response = await fetch(`${BASE_URL}dealers/${id}/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to load dealer");
  }

  return response.json();
};