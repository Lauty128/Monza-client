export interface marksInterface{
    id_mark: string
    name: string
}

export interface marksResponseInterface{
    status: number,
    total: number,
    data: marksInterface[]
}

export interface usersInterface{
    id_user: string
    name: string
    subname: string
}

export interface usersResponseInterface{
    status: number,
    total: number,
    data: usersInterface[]
}