export function store_in_localStorage(name:string, data:any[]):void{
    localStorage.setItem(`${name}--time`, Math.round(new Date().getTime()/1000).toString())
    localStorage.setItem(name, JSON.stringify(data))
}

export const store_time_controller = (name:string):boolean => {
    if(!localStorage.getItem(`${name}--time`) || !localStorage.getItem(name)) return false
    return ( Math.round(new Date().getTime()/1000) - parseInt(localStorage.getItem(`${name}--time`) || '') < (86400 * 7))
    //      ----------- Actual Time ------------   -    ------------ Stored time ----------------------    <    -- 7 Days --
    
    // 86.400 seconds equals one day, therefore 86.400 * 7 is one week
}

export function clear_local_store(name:string):void{
    localStorage.removeItem(name)
    localStorage.removeItem(`${name}--time`)
}