//---- Dependencies
    import { useEffect } from 'react'

//---- Store
    import { useVehiclesStore } from '@/store/vehiclesStore'; 

//----- Components
    import { VehicleCard, Page } from '.';

//----- Assets
    import { MdRestartAlt } from 'react-icons/md';


export function VehiclesSection(){
    //----- States
    const { vehicles, setVehicles } = useVehiclesStore()

    //----- Hooks
    useEffect(()=>{ 
        setVehicles(0)
    }, [])
    
    //----- Variables
    const arrayofthree = [1,2,3]
    

    //----- JSX return
    return(
        <>
            <section className='Main__containerVehicles'>
                { 
                (vehicles && vehicles.length > 0) ? 
                    <>
                        {   
                        vehicles.map((vehicle=> <VehicleCard key={vehicle.id_vehicle}  vehicle={vehicle}/> )) 
                        }        
                        { ((vehicles.length <= 3) && (window.innerWidth > 1200)) ? arrayofthree.map(index=>(<div key={index}></div>) ) : '' }
                        
                        <Page />
                    </> 
                    :
                    <div className='ErrorFindVehicles'>
                        <span className='ErrorFindVehicles__span'>
                            No se encontro ningun vehiculo!! <br />
                            Por favor vuelve a buscar
                        </span> <br />
                        <a className='ErrorFindVehicles__link' href='/'>
                            <MdRestartAlt/> Refrescar
                        </a>
                    </div>
                }
            </section>
        </>
    )
}