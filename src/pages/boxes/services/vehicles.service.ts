//----- Dependencies
import axios from 'axios';


const api_domain =  import.meta.env.VITE_API_URL || ''

export async function deleteVehicle(id:string){
    const data = await axios.delete(`${api_domain}/${id}`)
    return data
}

export async function modifyVehicle(id:string, body:any){
    const data = await axios.put(`${api_domain}/${id}`, body)
    return data
}

export async function newVehicle(body:FormData){
    return await axios.post(`${api_domain}/api/vehicles`, body)
                    .then(data => data)
}