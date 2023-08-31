//------- Dependencies
import { get_vehicles } from '@/services/vehicles.service';

//------- Dependencies
import { create } from 'zustand';

//------- Models
import { vehicleBasicInterface, filtersInterface, paginationInterface } from '@/models';

interface vehiclesStoreInterface{
    vehicles: vehicleBasicInterface[] | null
    filters: { [key: string]: filtersInterface } | {}
    pagination: paginationInterface

    setVehicles: (page:number) => Promise<void>
    changeFilters: (filters:filtersInterface) => void
}

export const useVehiclesStore = create<vehiclesStoreInterface>((set,get) => ({
    vehicles: null,
    filters: {},
    pagination: { size:6, page:0, total:0 },

    setVehicles: async(page)=>{
        const data = await get_vehicles({ page, where: get().filters })
        set(state=>({
            pagination: { ...state.pagination, page, total:data.total },
            vehicles: data.data
        }))
    },

    changeFilters: (filters:filtersInterface) =>{
        set(()=> ({ filters }));
        get().setVehicles(0);
    },
    changePage: (newPage:paginationInterface) => set(() => ({ pagination: newPage }))
}))