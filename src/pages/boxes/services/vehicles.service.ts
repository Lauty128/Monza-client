//----- Dependencies
import axios from 'axios';


export async function deleteVehicle(id:string){
    const data = await axios.delete(`${import.meta.env.VITE_HOST_API}/${id}`)
    return data
}

export async function modifyVehicle(id:string, body:any){
    const data = await axios.put(`${import.meta.env.VITE_HOST_API}/${id}`, body)
    return data
}

export async function newVehicle(body:any){
    return await axios.post(`${import.meta.env.VITE_HOST_API}`, body)
                    .then(data => data)
}