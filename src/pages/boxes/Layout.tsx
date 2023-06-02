//----- Depedendncies
import { Outlet, Link } from "react-router-dom";

//----- Assets
import { FaTimes } from "react-icons/fa";


export default function Boxes_Layout(){

    // This opens the boxes with a effect
    function openBox(){
        //------- Box animation
        setTimeout(()=>{
            document.querySelector(".ContainerBoxes__box")?.classList.add("ContainerBoxes__box--active")
        }, 30)
    }

    openBox()

    return(
        <div className='ContainerBoxes'>
            <div className="ContainerBoxes__box">
                <Link to='/' className="Component__exitButton" id="exit_of_box"><FaTimes /></Link>
                <Outlet/>
            </div>

            {/* Box to show a loading screen */}
            <div className="ContainerBoxes__loadingContainer">
                <span className="ContainerBoxes__circleLoading"></span>
                <span className="ContainerBoxes__circleLoading"></span>
                <span className="ContainerBoxes__circleLoading"></span>
            </div>
        </div>
    )
}