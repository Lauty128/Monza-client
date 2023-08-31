import { filtersInterface } from "@/models"

const filters_input = [ 'owner', 'type', 'fuel', 'mark', 'sort' ]

export default function filtersHandler(filters:{ [key: string]: filtersInterface }){
    let filtersString = ''

    const newFilters = filters_input.map(name=>{ 
        if(filters[name] !== undefined) return {name, value:filters[name]} 
    })

    newFilters.forEach(filter=>{
        if(filter === undefined) return
        filtersString += `${filter.name}=${filter.value}&`
    })
    
    return `&${filtersString.slice(0,filtersString.length - 1)}`
}