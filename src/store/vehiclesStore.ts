//------- Dependencies
import { get_vehicles } from '@/services/vehicles.service';

//------- Dependencies
import create from 'zustand';

//------- Models
import { vehicleBasicInterface, filtersInterface, paginationInterface } from '@/models';

interface vehiclesStoreInterface{
    vehicles: vehicleBasicInterface[] | null
    filters: filtersInterface | {}
    pagination: paginationInterface

    setVehicles: (page:number) => Promise<void>
}

export const useVehiclesStore = create<vehiclesStoreInterface>((set) => ({
    vehicles: null,
    filters: {},
    pagination: { size:6, page:0, total:0 },

    setVehicles: async(page:number)=>{
        const data = await get_vehicles({ page })
        set(state=>({
            pagination: { ...state.pagination, page, total:data.total },
            vehicles: data.data
        }))
    },

    changePage: (newPage:paginationInterface) => set(() => ({ pagination: newPage }))
}))