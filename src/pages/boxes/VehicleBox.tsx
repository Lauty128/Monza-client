//---- Services
import { get_vehicle } from "@/services/vehicles.service"

//---- Dependencies
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { FaAngleLeft, FaAngleRight, /*FaTimesCircle,*/ 
FaPen, FaTrashAlt/*, FaRegCheckCircle*/} from 'react-icons/fa'

//---- Models
import { vehicleBasicInterface, vehicleCompleteInterface } from "@/models"


export function VehicleBox(){
    //------- Hooks
    const { id } = useParams()
    const [ vehicle , setVehicle ] = useState<vehicleBasicInterface & vehicleCompleteInterface | null>(null)
    const [ slider, setSlider ] = useState<string[]>([])
    const [ imageNum, setImageNum ] = useState<number>(0)

    useEffect(()=>{
        (async()=>{
            const response = await get_vehicle(id || '')
            if(response){
                setVehicle(response)
                const extra_images = (response.extra_images == null)
                                        ? []
                                        : response.extra_images.split(',')
                setSlider([response.image, ...extra_images])
            }
            else{
                console.log("un error pa")
            }
        })()
    }, [])

    //------- Functions
    function optionsSection(data:vehicleBasicInterface & vehicleCompleteInterface){
        return (
            <>
                <div className="VehicleBox__optionsContainer">
                    <Link className="VehicleBox__option" to={`/vehicle/edit/${data.id_vehicle}`}>
                        <FaPen /> Editar
                    </Link>
                    <Link className="VehicleBox__option" to={'/'}>
                        <FaTrashAlt /> Eliminar
                    </Link>
                </div>
                <span className="VehicleBox__price">
                    { new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits:0
                    }).format(data.price) }
                </span>
            </>
            )
    }


    // async function buttonDelete(id:){ 
    //     controller_of_request(async()=> await deleteVehicle(id)) 
    //     getNewPage()
    // }

    function handlerSlider(num:number){
        const length = slider.length
        const newImage = imageNum + num

        if(newImage > (length - 1)) return setImageNum(0)        
        if(newImage < 0) return setImageNum(length - 1)
        setImageNum(newImage)
    }


    //------- JSX return
    return(
        <>
            <div className="VehicleBox__imagesContainer">
                <div className="VehicleBox__image">
                    {/* <a href={slider[imageNum]} download className="VehicleBox__downloadImage">
                        <FaDownload />
                    </a> */}
                    <img src={slider[imageNum]} /> 
                </div>
                <FaAngleLeft className="VehicleBox__arrow VehicleBox__arrow--left"
                    onClick={()=>{ handlerSlider(-1) }} />
                <FaAngleRight className="VehicleBox__arrow VehicleBox__arrow--right"
                    onClick={()=>{ handlerSlider(1) }} />

            </div>
            {
                vehicle ?
                <>
                    <h2>{ `${vehicle.version} ${vehicle.model}` }</h2>
                    <div className="VehicleBox__mainDataContainer">
                        <span className="VehicleBox__mainData">Marca: <b>{vehicle.mark.name}</b></span>
                        <span className="VehicleBox__mainData">Motor: <b>{vehicle.engine}</b></span>
                        <span className="VehicleBox__mainData">Combustible: <b>{vehicle.fuel}</b></span>
                        <span className="VehicleBox__mainData">Transmision: <b>{vehicle.transmission}</b></span>
                        <span className="VehicleBox__mainData">Color: <b>{vehicle.color}</b></span>
                        <span className="VehicleBox__mainData">Dueño: <b>{vehicle.user.name + ' ' + vehicle.user.subname}</b></span>
                        <span className="VehicleBox__mainData">Traccion: <b>{vehicle.traction || "Normal"}</b></span>
                        <span className="VehicleBox__mainData">Kilometraje:  
                            <b>{vehicle.km ? ` ${vehicle.km.toLocaleString('es-AR')}` : 'Indefinido'}</b>
                        </span>
                        <span className="VehicleBox__mainData">Tipo: <b>{vehicle.type}</b></span>
                    </div>
                    <h3 className='VehicleBox__h3'>Caracteristicas</h3>
                    {/*
                        (vehicle.extra && vehicle.extra.length > 0) ?
                        <div className="VehicleBox__extraDataContainer">
                            {vehicle.extra.map((extra, index)=>(
                                <div className="VehicleBox__extraData"  key={index}>
                                    <FaRegCheckCircle />
                                    <span>{ extra }</span>   
                                </div>
                            ))}
                        </div> :
                        <span className="VehicleBox__extraData--error"><FaTimesCircle /> Sin datos extra</span>
                            */}
                    <div className="VehicleBox__bottomContainer">
                       { vehicle ? optionsSection(vehicle) : '' }
                    </div>
                </> :
                    ""
            }
        </>
    )
}