import { FaInfoCircle } from 'react-icons/fa';


function MessageBox(){

    return(
        <div className="MessageBox">
            <FaInfoCircle className="MessageBox__icon"/>
            <p className="MessageBox__message">{/* Dynamic message */}</p>
          </div>
    )
}

export default MessageBox