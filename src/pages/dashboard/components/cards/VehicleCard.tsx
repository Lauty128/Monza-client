//----- Components
import { Link } from "react-router-dom";

//----- Assets
//import { FaWindowClose } from 'react-icons/fa'

//----- Models
import { vehicleBasicInterface } from "@/models";


interface PropsInterface{
    vehicle: vehicleBasicInterface   
}

export function VehicleCard({ vehicle }:PropsInterface){
    //----- JSX return
    return(
        <div className='Vehicle'>
            <div className='Vehicle__imageContainer'>
                <img src={vehicle.image} className='Vehicle__img' />
                <span className='Vehicle__model'>
                    { vehicle.model }
                </span>
                {(vehicle.traction !== 'Normal') ?
                    <span className='Vehicle__type'>
                        { vehicle.traction }
                    </span>
                : ""}
            </div>
            <div className='Vehicle__info'>
                <span className='Vehicle__price}' >
                { new Intl.NumberFormat("en-ES", {
                    style: "currency",
                    currency: "USD",
                }).format(vehicle.price) } 
                </span>
                <span className='Vehicle__mark' >{ vehicle.mark.name }</span>
            </div>
            <h3 className='Vehicle__name' id={vehicle.id_vehicle}>
                <Link to={`vehicle/${vehicle.id_vehicle}`} title={vehicle.version}>
                    { vehicle.version }
                </Link>
            </h3>
        </div>
    )
}