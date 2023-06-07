//------------- Models
import { filtersInterface, vehiclesResponseInterface } from "@/models"


const api_domain = 'http://localhost:4000'

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