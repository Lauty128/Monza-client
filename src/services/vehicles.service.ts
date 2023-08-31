//------------- Models
import { filtersInterface, vehicleCompleteInterface, vehiclesResponseInterface } from "@/models"

//-------------- Utils
import filtersHandler from '@/utils/filters'

const api_domain =  import.meta.env.VITE_API_URL || 'https://monza-production.up.railway.app'

interface paramsInterface{
    page?:Number
    size?:Number
    where?: { [key: string]: filtersInterface }
}

export const get_vehicles = async ({ page=0, size=6, where }:paramsInterface):Promise<vehiclesResponseInterface>=>{
    // const filters = where ? filtersHandler(where) : '';
    const filters = (Object.values((where as Object)).length > 0) 
                        ? filtersHandler((where as { [key: string]: filtersInterface })) 
                        : '';

    const data:Promise<vehiclesResponseInterface> = await fetch(`${api_domain}/api/vehicles?page=${page}&size=${size}&${filters}`).then(res => res.json())
    return data
}


export const get_vehicle = async (id:string):Promise<vehicleCompleteInterface>=>{
    const data:Promise<vehicleCompleteInterface> = await fetch(`${api_domain}/api/vehicles/${id}`).then(res => res.json())
    
    return data 
}