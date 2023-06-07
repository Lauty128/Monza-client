export interface vehicleBasicInterface{
    id_vehicle: string
    version: string
    image: string
    mark: { 
        id_mark:number,
        name: string 
    }
    model: number
    price: number
    type: string
    traction: string
    userIdUser: string
}

export interface vehicleCompleteInterface{
    extra_images: string | null
    engine: string
    km: number
    color: string
    transmission: string
    offer_price: string | null
    user:{
        name: string
        subname: string
        id_user: string
    }

}

export interface vehiclesResponseInterface{
    status: number,
    total: number,
    data: vehicleBasicInterface[]
}

export interface filtersInterface{
    order?: string
    mark?: string
    owner?: number
    fuel?: string
    type?: string
}

export interface paginationInterface{
    page: number
    total: number
    size: number
}