//---- Services
import { get_vehicle } from "@/services/vehicles.service"
import { deleteVehicle } from "./services"

//---- Dependencies
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { FaAngleLeft, FaAngleRight, FaDownload, /*FaTimesCircle,*/ 
FaPen, FaTrashAlt/*, FaRegCheckCircle*/} from 'react-icons/fa'
import axios from "axios"
import fileDownload from "js-file-download"

//---- Models
import { vehicleCompleteInterface } from "@/models"

//---- Utils
import { newMessage } from "@/utils/box-effects"

//---- States
import { useVehiclesStore } from "@/store/vehiclesStore"



export function VehicleBox(){
    //------- Hooks and states
    const { id } = useParams()
    const [ vehicle , setVehicle ] = useState<vehicleCompleteInterface | null>(null)
    const [ slider, setSlider ] = useState<string[]>([])
    const [ imageNum, setImageNum ] = useState<number>(0)
    const { setVehicles } = useVehiclesStore()

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
    function optionsSection(data:vehicleCompleteInterface){
        return (
            <>
                <div className="VehicleBox__optionsContainer">
                    <Link className="VehicleBox__option" to={`/vehicle/edit/${data.id_vehicle}`}>
                        <FaPen /> Editar
                    </Link>
                    <Link to={'/'} className="VehicleBox__option" style={{cursor:'pointer'}} onClick={()=> buttonDelete(data.id_vehicle)}>
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

    async function downloadImage(){
        axios.get(slider[imageNum], {
            responseType: 'blob',
        })
        .then((res) => {
            fileDownload(res.data, `${vehicle?.mark.name}-${vehicle?.version}--${imageNum + 1}.jpg`)
        })
          
    }


    async function buttonDelete(id:string){ 
        const response = await deleteVehicle(id)

        if(response.data) newMessage({ type:"ERROR", message:response.data.message })
        else newMessage({ type:"OK", message:response.data.message })
        await setVehicles(0)
    }

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
                    <span className="VehicleBox__downloadImage" style={{cursor:'pointer'}} onClick={()=> downloadImage()}>
                        <FaDownload />
                    </span>
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
                    {/* <h3 className='VehicleBox__h3'>Caracteristicas</h3> */}
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
