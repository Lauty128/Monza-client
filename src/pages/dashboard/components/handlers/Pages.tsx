//---- Assets
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'

//---- Store
import { useVehiclesStore } from '@/store/vehiclesStore'


export function Page(){

    //----- States
    const { pagination } = useVehiclesStore()
    const stateChanges = useVehiclesStore(state => ({ setVehicles:state.setVehicles }))

    //----- Functions
    function handlerPage(num:number):void{
        const newPage = pagination.page + num;
        stateChanges.setVehicles(newPage)
    }


    //----- JSX return
    return(
        <div className="HandlerPages">
            { (pagination.page > 0) ? 
            <span className='HandlerPages__span' onClick={()=> handlerPage(-1)}>
                <FaAngleLeft/>
            </span> : ""}
            <span className='HandlerPages__span'>{pagination.page + 1}</span>
            { (pagination.page * pagination.size) < pagination.total ? 
            <span className='HandlerPages__span' onClick={()=> handlerPage(1)}>
                <FaAngleRight/>
            </span> : ""}
        </div>
    )
}