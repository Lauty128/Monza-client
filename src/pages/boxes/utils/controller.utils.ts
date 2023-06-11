//---- utils
    import { newMessage } from "@/utils/box-effects"


//---- data
const inputs_of_type_select = ["type","fuel","userIdUser","markIdMark", "transmission", "traction"]

export const is_input_of_type_select = (name:string) => inputs_of_type_select.includes(name)

export async function controller_of_request(cb:Function, load=false){
    if(load) (document.querySelector(".ContainerBoxes__loadingContainer") as HTMLDivElement)
                .classList.add("ContainerBoxes__loadingContainer--active")
    
    const response = await cb()

    if(response.response.data) newMessage({ type:"ERROR", message:response.response.data.message })
    else newMessage({ type:"OK", message:response.message })
    
    if(load) (document.querySelector(".ContainerBoxes__loadingContainer") as HTMLDivElement)
                .classList.remove("ContainerBoxes__loadingContainer--active")

}

export function capture_image(images:FileList | null, state:any){
    const reader = new FileReader()
    
    if(images){ reader.readAsDataURL(images[0]) }

    reader.onload = e=> state(e.target?.result) 
}

export function cancel_form_submit_with_enter(e:React.KeyboardEvent<HTMLFormElement>){ if(e.key == "Enter") e.preventDefault() }

