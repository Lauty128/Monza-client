//----- Dependencies
import axios from 'axios';


const api_domain =  import.meta.env.VITE_API_URL || 'https://monza-production.up.railway.app'

export async function deleteVehicle(id:string){
    const data = await axios.delete(`${api_domain}/api/vehicles/${id}`)
    return data
}

export async function modifyVehicle(id:string, body:any){
    const data = await axios.put(`${api_domain}/api/vehicles/${id}`, body)
    return data
}

export async function newVehicle(body:FormData){
    const data = await axios.post(`${api_domain}/api/vehicles`, body).then(res => res.data).catch(error => error)
    return data
}