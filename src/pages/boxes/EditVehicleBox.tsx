//---- Dependencies
import { useParams } from "react-router-dom"
import { useState , useEffect, FormEvent } from "react"
import { useComplementaryStore } from "@/store/complementaryStore"

//---- Services
import { modifyVehicle } from "./services"
import { get_vehicle } from "@/services";

//---- Models
import { vehicleCompleteInterface } from "@/models";

//---- Utils
import { newMessage } from "@/utils/box-effects";
import { cancel_form_submit_with_enter } from ".";



export function EditVehicleBox() {
    //------- Paramas & props
    const { id } = useParams()

    //------- Hooks and States
    const { marks, users } = useComplementaryStore()
    const [ vehicle , setVehicle ] = useState<vehicleCompleteInterface | null>(null)
  
    useEffect(()=>{
        (async()=>{
            const response = await get_vehicle(id || "");
            if(response) setVehicle(response);
        })()
    }, [])

    function inputHandler(input:HTMLInputElement | HTMLTextAreaElement){
      const label = input.previousElementSibling as HTMLLabelElement
  
      if(!label?.classList.contains("UploadForm__label--active")){
        //if the "label" not have the class:{styles["label--active"]}, it is added
        label?.classList.add("UploadForm__label--active")
        return
      }
  
      if(input.value.length === 0){
        //if blur is true and the input has no content then it remove the class {styles["label--active"]}
        label?.classList.remove("UploadForm__label--active")
      }
    }

    async function submitHandler(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
        const form = e.target as HTMLFormElement
        
        const body = new FormData(form)
  
        const response =  await modifyVehicle(id || '',body)

        if(response && response.status == 200) newMessage({ type:"OK", message:response.message })
        else newMessage({ type:"ERROR", message:response.message })

        //window.location.href = '/'
      }
    return(
            (vehicle) 
            ? <>
                <div className="UploadForm__div--edit">
                    <img src={vehicle !== null ? vehicle.image : ''} className="UploadForm__image--edit" />
                    <h2 className="UploadForm__h2--edit">{ vehicle ? vehicle.mark.name + " " + vehicle.version : "" }</h2>
                </div>
                <form className='UploadForm__form UploadForm__form--edit' onKeyDown={e => cancel_form_submit_with_enter(e)} onSubmit={e=> submitHandler(e)}>
  
                    <div className='UploadForm__inputContainer'>
                        <label className='UploadForm__label UploadForm__label--active' htmlFor="input-mark">Marca</label>
                        <select name="markIdMark" id="input-mark">
                            {
                            marks?.map(mark=> (mark.name == vehicle.mark.name)
                                ? <option value={mark.id_mark} selected key={mark.id_mark}>{mark.name}</option>
                                : <option value={mark.id_mark} key={mark.id_mark}>{mark.name}</option> )
                            }
                        </select>
                    </div>
            
                    <div className='UploadForm__inputContainer'>        
                        <label className='UploadForm__label UploadForm__label--active' htmlFor="input-version">Version</label>
                        <input id="input-version" type="text" name="version" autoComplete='off' value={vehicle.version}
                        onFocus={e=> inputHandler(e.target)} onBlur={e=> inputHandler(e.target)} onChange={e=> setVehicle({ ...vehicle, version: e.target.value }) }/>
                    </div>
            
                    <div className='UploadForm__inputContainer'>
                        <label className='UploadForm__label UploadForm__label--active' htmlFor="input-engine">Motor</label>
                        <input id="input-engine" type="text" name="engine" autoComplete='off' value={vehicle.engine}
                        onFocus={e=> inputHandler(e.target)} onBlur={e=> inputHandler(e.target)} onChange={e=> setVehicle({ ...vehicle, engine: e.target.value }) }/>
                    </div>
            
                    <div className='UploadForm__inputContainer'>
                        <label className='UploadForm__label UploadForm__label--active' htmlFor="input-fuel">Combustible</label>
                        <select name="fuel" id="input-fuel" >
                            {
                            ['Nafta', 'Diesel','GNC'].map((fuel, index)=> (fuel === vehicle.fuel)
                                ? <option value={fuel} key={index} selected>{ fuel }</option>
                                : <option value={fuel} key={index}>{ fuel }</option>)
                            }
                        </select>
                    </div>
            
                    <div className='UploadForm__inputContainer'>
                        <label className='UploadForm__label UploadForm__label--active' htmlFor="input-type">Tipo</label>
                        <select name="type" id="input-type">
                            {
                            ['Auto', 'Camioneta','Utilitario', 'Otro'].map((type,index)=> (type === vehicle.type)
                                ? <option value={type} key={index} selected>{ type }</option>
                                : <option value={type} key={index}>{ type }</option>)
                            }
                        </select>
                    </div>
            
                    <div className='UploadForm__inputContainer'>
                        <label className='UploadForm__label UploadForm__label--active' htmlFor="input-transmission">Transmision</label>
                        <select  name="transmission" id="input-transmission">
                            {
                            ['Manual', 'Automatica'].map((transmission,index)=> (transmission === vehicle.transmission)
                                ? <option value={transmission} key={index} selected>{ transmission }</option>
                                : <option value={transmission} key={index}>{ transmission }</option>)
                            }
                        </select>
                    </div> 
                    
                    <div className='UploadForm__inputContainer'>
                        <label className='UploadForm__label UploadForm__label--active' htmlFor="input-traction">Traccion</label>
                        <select  name="traction" id="input-traction">
                            {
                            ['Normal','4x2','4x4','Integral'].map((traction,index)=> (traction === vehicle.traction)
                                ? <option value={traction} key={index} selected>{ traction }</option>
                                : <option value={traction} key={index}>{ traction }</option>)
                            }
                        </select>
                    </div>
            
                    <div className='UploadForm__inputContainer'>
                        <label className='UploadForm__label UploadForm__label--active' htmlFor="input-color">Color</label>
                        <input id="input-color" type="text" name="color" autoComplete='off' value={vehicle.color}
                        onFocus={e=> inputHandler(e.target)} onBlur={e=> inputHandler(e.target)} onChange={e=> setVehicle({ ...vehicle, color: e.target.value }) }/>
                    </div>
            
                    <div className='UploadForm__inputContainer'>
                        <label className='UploadForm__label UploadForm__label--active' htmlFor="input-model">Modelo</label>
                        <input id="input-model" type="number" name="model" autoComplete='off' value={vehicle.model}
                        onFocus={e=> inputHandler(e.target)} onBlur={e=> inputHandler(e.target)} onChange={e=> setVehicle({ ...vehicle, model: Number(e.target.value) }) } />
                    </div>
            
                    <div className='UploadForm__inputContainer'>
                        <label className='UploadForm__label UploadForm__label--active' htmlFor="input-owner">Dueño</label>
                        <select name="userIdUser" id="input-owner" >
                        {
                            users?.map(user => (user.id_user === vehicle.user.id_user)
                                    ? <option key={user.id_user} selected value={user.id_user}>{user.name + " " + user.subname}</option>
                                    : <option key={user.id_user} value={user.id_user}>{user.name + " " + user.subname}</option>)
                        }
                        </select>
                    </div>
            
                    <div className='UploadForm__inputContainer'>
                        <label className='UploadForm__label UploadForm__label--active' htmlFor="input-km">Kilometraje</label>
                        <input id="input-km" type="number" name="km" autoComplete='off' value={vehicle.km}
                        onFocus={e=> inputHandler(e.target)} onBlur={e=> inputHandler(e.target)} onChange={e=> setVehicle({ ...vehicle, km: Number(e.target.value) }) }/>
                    </div>
            
                    <div className='UploadForm__inputContainer'>
                        <label className='UploadForm__label UploadForm__label--active' htmlFor="input-price">Precio</label>
                        <input id="input-price" type="number" name="price" autoComplete='off' value={vehicle.price}
                        onFocus={e=> inputHandler(e.target)} onBlur={e=> inputHandler(e.target)} onChange={e=> setVehicle({ ...vehicle, price: Number(e.target.value) }) }/>
                    </div>
            
                    <input id="input-" type="submit" value="ENVIAR" className='UploadForm__submitButton' />
                </form>
            
            </>
            : <h4>No existe ningun vehiculo con ese identificador</h4>
    )

    
  }