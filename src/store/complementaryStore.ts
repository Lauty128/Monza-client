//------- Dependencies
import { create } from 'zustand';

//------- Models
import { usersInterface, marksInterface } from '@/models/services.model';

interface complementaryStoreInterface{
    //---- Attributes
    users: usersInterface[] | null
    marks: marksInterface[] | null
    
    //---- Methods
    setUsers: (usersData:usersInterface[]) => void
    setMarks: (marksData:marksInterface[]) => void
}


export const useComplementaryStore = create<complementaryStoreInterface>((set)=>({
    users: null,
    marks: null,

    setUsers: (usersData) => set(() => ({ users: usersData })),
    setMarks: (marksData) => set(() => ({ marks: marksData }))
}))