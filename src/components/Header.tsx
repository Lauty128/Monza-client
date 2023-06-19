//---- Dependencies
import { Link } from 'react-router-dom';

//---- Assets
import logo from '@/assets/logo.webp'
import { FaFileExcel, FaPlusCircle } from 'react-icons/fa'


function Header(){

    return (
        <header className='Header'>
            <img src={logo} alt="logo" className='Header__image'/>    
            <div className="Header__optionsContainer">
              <Link className="Header__option" to={'/vehicle/create'}>
                <FaPlusCircle /> NUEVO
              </Link>
              <a href={`${import.meta.env.VITE_API_URL}/api/csv` || 'https://monza-production.up.railway.app/api/csv'} className="Header__option">
                <FaFileExcel /> DESCARGAR
              </a>
            </div>
        </header>
    )
}

export default Header