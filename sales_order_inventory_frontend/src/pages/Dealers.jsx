import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getDealers } from "../api/dealers"
import DealerList from "../components/DealerList"

function Dealers(){
    const navigate = useNavigate()
    const[dealers,setDealers] = useState([])
    const[error,setError] = useState("")

    const fetchDealers=async()=>{
        try{
            const data = await getDealers()
            setDealers(data)
        }catch(err){
            setError("Network Error")
        }
    }

    useEffect(()=>{
        fetchDealers()
    },[]);

     const handleEdit=(id)=>{
        navigate(`/edit-dealers/${id}`)
     }

    return(
        <>
        <DealerList dealers={dealers} error={error} onEdit={handleEdit}/>
       </>
    )

}
export default Dealers