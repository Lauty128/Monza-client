//---- data
const inputs_of_type_select = ["type","fuel","userIdUser","markIdMark", "transmission", "traction"]


//---- Functions
export const is_input_of_type_select = (name:string) => inputs_of_type_select.includes(name)

export function capture_image(images:FileList | null, state:any){
    const reader = new FileReader()
    
    if(images){ reader.readAsDataURL(images[0]) }

    reader.onload = e=> state(e.target?.result) 
}

export function cancel_form_submit_with_enter(e:React.KeyboardEvent<HTMLFormElement>){ if(e.key == "Enter") e.preventDefault() }

