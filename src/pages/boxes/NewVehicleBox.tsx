//----------------- States and Dependencies
import { FormEvent, useState } from "react"
import { useComplementaryStore } from "@/store/complementaryStore"

//----------------- Assets
import { FaPlusCircle } from 'react-icons/fa';

//----------------- Utils
import { is_input_of_type_select, capture_image, cancel_form_submit_with_enter } from "./utils/controller.utils"
import { newMessage } from "@/utils/box-effects";

//----------------- Services
import { newVehicle } from "."



export function NewVehicleBox() {

    //------- Hooks and States
    const { marks, users } = useComplementaryStore()
    const [ image , setImage ] = useState<string | null>(null)
    const [ images, setImages ] = useState<number | null>(null)
  
    //------- Functions
  
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
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const body = new FormData(form);
      
      (document.querySelector(".ContainerBoxes__loadingContainer") as HTMLDivElement)
                .classList.add("ContainerBoxes__loadingContainer--active");

      const response =  await newVehicle(body);
      console.log(response);

      if(response && response.status == 201) newMessage({ type:"OK", message:response.message })
      else newMessage({ type:"ERROR", message:response.message });

      (document.querySelector(".ContainerBoxes__loadingContainer") as HTMLDivElement)
                .classList.remove("ContainerBoxes__loadingContainer--active")
  
      setImage(null)
      setImages(null)
      form.reset()
      document.querySelectorAll(".UploadForm__label").forEach(label=>{
        if(!is_input_of_type_select((label.nextElementSibling as HTMLInputElement).name)){
          label.classList.remove("UploadForm__label--active")
        }
      })
    }


    //------- JSX return
    return (
        <form className='UploadForm__form' onSubmit={e=> submitHandler(e)} onKeyDown={e => cancel_form_submit_with_enter(e)}>
          <div className='UploadForm__inputImageContainer'>
            {
              !image
              ? <label className='UploadForm__labelImage' htmlFor="input-image"><FaPlusCircle/> Imagen</label>
              : <div className="UploadForm__previewImageContainer">
                <label className='UploadForm__labelImage UploadForm__labelImage--active' htmlFor="input-image"><FaPlusCircle/> Add</label>
                <img src={image}  className='UploadForm__previewImage' />
              </div>
            }
            <input id="input-image" type="file"
            name="image" accept="image/png, image/jpeg" onChange={(e)=> capture_image(e.target.files, setImage)}/>
          </div>
  
          <div className='UploadForm__inputImagesContainer'>
            {/* <label className={styles.UploadForm__label} htmlFor="input-images">Images</label> */}
            {
              (images)
              ? <span className="UploadForm__imagesSelected">{images} imagenes</span>
              : ''
            }
            <label className='UploadForm__labelImage' htmlFor="input-images"><FaPlusCircle/> Extra</label>
            <input id="input-images" type="file" name="images" onChange={e=> setImages(e.target.files?.length as number)}
            multiple accept="image/png, image/jpeg"/> 
          </div>
  
          <div className='UploadForm__inputContainer'>
            <label className='UploadForm__label UploadForm__label--active' htmlFor="input-mark">Marca</label>
            <select name="markIdMark" id="input-mark">
                {
                    marks?.map(mark=> <option value={mark.id_mark} key={mark.id_mark}>{mark.name}</option> )
                }
            </select>
          </div>
  
          <div className='UploadForm__inputContainer'>        
            <label className='UploadForm__label' htmlFor="input-version">Version</label>
            <input id="input-version" type="text" name="version" autoComplete='off'
            onFocus={e=> inputHandler(e.target)} onBlur={e=> inputHandler(e.target)} />
          </div>
  
          <div className='UploadForm__inputContainer'>
            <label className='UploadForm__label' htmlFor="input-engine">Motor</label>
            <input id="input-engine" type="text" name="engine" autoComplete='off'
            onFocus={e=> inputHandler(e.target)} onBlur={e=> inputHandler(e.target)} />
          </div>
  
          <div className='UploadForm__inputContainer'>
            <label className='UploadForm__label UploadForm__label--active' htmlFor="input-fuel">Combustible</label>
            <select name="fuel" id="input-fuel" >
              <option value="Nafta">Nafta</option>
              <option value="Diesel">Diesel</option>
              <option value="GNC">GNC</option>
            </select>
          </div>
  
          <div className='UploadForm__inputContainer'>
            <label className='UploadForm__label UploadForm__label--active' htmlFor="input-type">Tipo</label>
            <select name="type" id="input-type">
              <option value="Auto">Auto</option>
              <option value="Camioneta">Camioneta</option>
              <option value="Utilitario">Utilitario</option>
            </select>
          </div>
  
          <div className='UploadForm__inputContainer'>
            <label className='UploadForm__label UploadForm__label--active' htmlFor="input-transmission">Transmision</label>
            <select  name="transmission" id="input-transmission">
              <option value="Manual">Manual</option>
              <option value="Automatica">Automatica</option>
            </select>
            {/* <input id="input-transmission" type="text" name="transmission" autoComplete='off'
            onFocus={e=> inputHandler(e.target)} onBlur={e=> inputHandler(e.target)} /> */}
          </div> 
          
          <div className='UploadForm__inputContainer'>
            <label className='UploadForm__label UploadForm__label--active' htmlFor="input-traction">Traccion</label>
            {/* <input id="input-traction" type="text" name="traction"
            onFocus={e=> inputHandler(e.target)} onBlur={e=> inputHandler(e.target)} /> */}
            <select  name="traction" id="input-traction">
              <option value="Normal">Normal</option>
              <option value="4x2">4x2</option>
              <option value="4x4">4x4</option>
              <option value="Integral">Integral</option>
            </select>
          </div>
  
          <div className='UploadForm__inputContainer'>
            <label className='UploadForm__label' htmlFor="input-color">Color</label>
            <input id="input-color" type="text" name="color" autoComplete='off'
            onFocus={e=> inputHandler(e.target)} onBlur={e=> inputHandler(e.target)} />
          </div>
  
          <div className='UploadForm__inputContainer'>
            <label className='UploadForm__label' htmlFor="input-model">Modelo</label>
            <input id="input-model" type="number" name="model" autoComplete='off'
            onFocus={e=> inputHandler(e.target)} onBlur={e=> inputHandler(e.target)} />
          </div>
  
          <div className='UploadForm__inputContainer'>
            <label className='UploadForm__label UploadForm__label--active' htmlFor="input-owner">Dueño</label>
            <select name="userIdUser" id="input-owner" >
              {
                users?.map(user => <option key={user.id_user} value={user.id_user}>{user.name + " " + user.subname}</option> )
              }
            </select>
          </div>
  
          <div className='UploadForm__inputContainer'>
            <label className='UploadForm__label' htmlFor="input-km">Kilometraje</label>
            <input id="input-km" type="number" name="km" autoComplete='off'
            onFocus={e=> inputHandler(e.target)} onBlur={e=> inputHandler(e.target)} />
          </div>
  
          <div className='UploadForm__inputContainer'>
            <label className='UploadForm__label' htmlFor="input-price">Precio</label>
            <input id="input-price" type="number" name="price" autoComplete='off'
            onFocus={e=> inputHandler(e.target)} onBlur={e=> inputHandler(e.target)} />
          </div>
  
          <input id="input-" type="submit" value="ENVIAR" className='UploadForm__submitButton' />
        </form>
    )
  }