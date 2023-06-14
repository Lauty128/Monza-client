//------------- Models
import { filtersInterface, vehicleBasicInterface, vehicleCompleteInterface, vehiclesResponseInterface } from "@/models"


const api_domain =  import.meta.env.VITE_API_URL || 'https://monza-production.up.railway.app'

interface paramsInterface{
    page?:Number
    size?:Number
    where?: filtersInterface
}

export const get_vehicles = async ({ page=0, size=6, where }:paramsInterface):Promise<vehiclesResponseInterface>=>{
    const filters = ''
    console.log(where);
    const data:Promise<vehiclesResponseInterface> = await fetch(`${api_domain}/api/vehicles?page=${page}&size=${size}&${filters}`).then(res => res.json())

    return data
}


export const get_vehicle = async (id:string):Promise<vehicleBasicInterface & vehicleCompleteInterface>=>{
    const data:Promise<vehicleBasicInterface & vehicleCompleteInterface> = await fetch(`${api_domain}/api/vehicles/${id}`).then(res => res.json())
    console.log(data);
    return data 
}