import { marksInterface, marksResponseInterface, 
        usersInterface, usersResponseInterface } from "@/models/services.model";

//------- Utils
//import { store_in_localStorage } from "@/utils/localStorage";

const api_domain = 'http://localhost:4000'

export const get_users = async ():Promise<usersInterface[]>=>{
    const data:Promise<usersResponseInterface> = await fetch(`${api_domain}/api/users`).then(res => res.json())

    //store_in_localStorage('users_list', (await data).data)

    return (await data).data
}

export const get_marks = async ():Promise<marksInterface[]>=>{
    const data:Promise<marksResponseInterface> = await fetch(`${api_domain}/api/marks`).then(res => res.json())

    //store_in_localStorage('marks_list', (await data).data)

    return (await data).data
}