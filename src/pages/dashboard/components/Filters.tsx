//----- Hooks
    import { FormEvent, useEffect, useRef, useState } from 'react'

//----- Assets
    import { MdRestartAlt } from 'react-icons/md'

//----- Models
    import { filtersInterface, marksInterface } from '@/models'

//----- States
    import { useComplementaryStore } from '@/store/complementaryStore'
    import { useVehiclesStore } from '@/store/vehiclesStore'

//----- Services
    import { get_marks, get_users } from '@/services/data.service'

//----- Utils
    //import { store_time_controller, clear_local_store } from '@/utils/localStorage'


export function Filters(){
    //----- States
    const { marks, users } = useComplementaryStore()
    const stateChanges = useComplementaryStore(state => ({ setMarks:state.setMarks, setUsers:state.setUsers }) )
    const { changeFilters } = useVehiclesStore();

    //----- Hooks
    const [ localFilters, setLocalFilters ] = useState<filtersInterface | {}>({})
    const formRef = useRef(null)
    
    useEffect(()=>{

        //if(!store_time_controller('marks_list')){ clear_local_store('marks_list') }
        //if(!store_time_controller('users_list')){ clear_local_store('users_list') }

        (async()=>{
            //---- Marks and Users data defined
            const marksData:marksInterface[] = await get_marks()
            stateChanges.setMarks(marksData)

            const usersData = await get_users()
            stateChanges.setUsers(usersData)
        })()
    }, [])

    //------ Filter Handler
    function filtersChange(target:HTMLInputElement | HTMLSelectElement){
        const { name , value , type } = target
        if(type === 'checkbox'){
            if(!(target as HTMLInputElement).checked) return setLocalFilters({ ...localFilters, [name]:undefined })
            else filtersCheckbox(target as HTMLInputElement);
        }
        
        if(value === "") return setLocalFilters({ ...localFilters, [name]:undefined })
        setLocalFilters({...localFilters, [name]:value})
    }

    function filtersCheckbox(target:HTMLInputElement){
        let options = ['checkbox-camioneta','checkbox-utilitario','checkbox-auto']
        options.forEach(element=>{
            if(element !== target.getAttribute('id')){
                const input:HTMLElement| null = document.getElementById(element)
                if(input) (input as HTMLInputElement).checked = false
            }
        })
    }

    //------- Form Handler
    async function submitHandler(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        //const filters = filtersHandler(localFilters as { [key: string]: filtersInterface });
        changeFilters(localFilters);
        
    }
    
    async function resetHandler(e:FormEvent<HTMLButtonElement>){
        e.preventDefault()
        setLocalFilters({})
        //setFilters({})
        // the second parameter indicates that the filters must be reset
    
        if(formRef.current !== null){
            (formRef.current as HTMLFormElement).reset()
            // refresh the form
        }
    }


    return (
        <form className='FiltersContainer' ref={formRef} onSubmit={e=> submitHandler(e)}>
            <div>
                <label htmlFor="sortOption">Ordenar por: </label>
                <select name="sort"  className='FiltersContainer__select' id="sortOption" onChange={e=> filtersChange(e.target)}>
                    <option value="">Predeterminado</option>
                    <option value="pUP">Precio: menor a mayor</option>
                    <option value="pDOWN">Precio: mayor a menor</option>
                    <option value="mUP">Modelo: menor a mayor</option>
                    <option value="mDOWN">Modelo: mayor a menor</option>
                </select>
            </div>

                {
                    marks
                    ?   <select name="mark"  className='FiltersContainer__select' onChange={e=> filtersChange(e.target)}>
                            <option value="">Marca</option>
                            {
                                marks.map(mark=>{
                                    return <option key={mark.id_mark} value={mark.id_mark}>{mark.name}</option>
                                })
                            }
                        </select>
                    :   ''
                }   
            
            <select name="owner" className='FiltersContainer__select' onChange={e=> filtersChange(e.target)}>
                <option value="">Dueño</option>
                {
                    users
                    ?   users.map(user=>{
                        return <option key={user.id_user} value={user.id_user}>{user.name + " " + user.subname}</option>
                    })
                    : ''
                }
            </select>

            <select name="fuel"  className='FiltersContainer__select' onChange={e=> filtersChange(e.target)}>
                <option value="">Combustible</option>
                <option value="Nafta">Nafta</option>
                <option value="Diesel">Diesel</option>
                <option value="GNC">GNC</option>
            </select>

            <div className="FiltersContainer__div">
                <span>Tipo:</span>
                <div className="FiltersContainer__checkboxContainer">
                    <input type="checkbox" name="type" className="FiltersContainer__checkbox" value='Auto' id="checkbox-auto" onChange={e=> filtersChange(e.target)} />
                    <label htmlFor="checkbox-auto">Auto</label>
                </div>
                <div className="FiltersContainer__checkboxContainer">
                    <input type="checkbox" name="type" className="FiltersContainer__checkbox" value='Camioneta' id="checkbox-camioneta" onChange={e=> filtersChange(e.target)} />
                    <label htmlFor="checkbox-camioneta">Camioneta</label>
                </div>
                <div className="FiltersContainer__checkboxContainer">
                    <input type="checkbox" name="type" className="FiltersContainer__checkbox" value='Utilitario' id="checkbox-utilitario" onChange={e=> filtersChange(e.target)} />
                    <label htmlFor="checkbox-utilitario">Utilitario</label>
                </div>
            </div>
                
            <input type="submit" value="FILTRAR" className='FiltersContainer__submitFilters'/>
            
            <button className='FiltersContainer__restartFilters' onClick={e=> resetHandler(e)}>
                <MdRestartAlt/> Restablecer
            </button> 
        </form>
        
    )

    {/*
    //----- Functions
    async function submitHandler(e){
        e.preventDefault()
        setFilters(localFilters)
    }
    
    async function resettHandler(e){
        e.preventDefault()
        setLocalFilters({})
        setFilters({})
        // the second parameter indicates that the filters must be reset
        
        if(formRef.current !== null){
            formRef.current.reset()
            // refresh the form
        }
    }
    
    function filtersChange(target){
        const { name , value , type } = target
        if(type === 'checkbox'){
            if(!target.checked) return setLocalFilters({ ...localFilters, [name]:undefined })
            else filtersCheckbox(target);
        }
        
        if(value === "") return setLocalFilters({ ...localFilters, [name]:undefined })
        setLocalFilters({...localFilters, [name]:value})
    }
    
    function filtersCheckbox(target){
        let options = ['checkbox-camioneta','checkbox-utilitario','checkbox-auto']
        options.forEach(element=>{
            if(element !== target.getAttribute('id')){
                //document.getElementById(element).checked = false
            }
        })
    }
            */}
}




{/* 
////////////////------------------------ FORMULARIO CON SUS FUNCIONES REFERENCIADAS A LOS ELEMENTOS

<form className='FiltersContainer' ref={formRef}>

    <div>
        <label htmlFor="sortOption">Ordenar por: </label>
        <select name="sort"  className='FiltersContainer__select' id="sortOption" 
        onChange={e=> filtersChange(e.target)} >
            <option value="">Predeterminado</option>
            <option value="pUP">Precio: menor a mayor</option>
            <option value="pDOWN">Precio: mayor a menor</option>
            <option value="mUP">Modelo: menor a mayor</option>
            <option value="mDOWN">Modelo: mayor a menor</option>
        </select>
    </div>

    <select name="mark"  className='FiltersContainer__select' 
    onChange={e=> filtersChange(e.target)} >
        <option value="">Marca</option>
        <option value="Volkswagen">Volkswagen</option>
        <option value="Fiat">Fiat</option>
        <option value="Peugeot">Peugeot</option>
        <option value="Toyota">Toyota</option>
        <option value="Chevrolet">Chevrolet</option>
        <option value="Ford">Ford</option>
        <option value="Suzuki">Suzuki</option>
    </select>

    <select name="owner" className='FiltersContainer__select' 
    onChange={e=> filtersChange(e.target)} >
        <option value="">Dueño</option>
        { clientsData.map((client,index)=> <option key={index} value={client}>{client}</option>) }
    </select>

    <select name="fuel"  className='FiltersContainer__select' 
    onChange={e=> filtersChange(e.target)} >
        <option value="">Combustible</option>
        {
            fuelData.map((fuel,index)=> <option key={index} value={fuel}>{fuel}</option>)
        }
    </select>

    <div className="FiltersContainer__div">
        <span>Tipo:</span>
        <div className="FiltersContainer__checkboxContainer">
            <input type="checkbox" name="type" className="FiltersContainer__checkbox" value='Auto' id="checkbox-auto" onChange={e=> filtersChange(e.target)} />
            <label htmlFor="checkbox-auto">Auto</label>
        </div>
        <div className="FiltersContainer__checkboxContainer">
            <input type="checkbox" name="type" className="FiltersContainer__checkbox" value='Camioneta' id="checkbox-camioneta" onChange={e=> filtersChange(e.target)} />
            <label htmlFor="checkbox-camioneta">Camioneta</label>
        </div>
        <div className="FiltersContainer__checkboxContainer">
            <input type="checkbox" name="type" className="FiltersContainer__checkbox" value='Utilitario' id="checkbox-utilitario" onChange={e=> filtersChange(e.target)} />
            <label htmlFor="checkbox-utilitario">Utilitario</label>
        </div>
    </div>

    <input type="submit" value="FILTRAR" className='FiltersContainer__submitFilters'
    onClick={e=> submitHandler(e)}/>
    
    <button className='FiltersContainer__restartFilters' onClick={e=> resettHandler(e)}>
        <MdRestartAlt/> Restablecer
    </button> 

</form>


*/}