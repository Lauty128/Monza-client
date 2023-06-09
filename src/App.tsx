//---- Dependencies
  import { BrowserRouter, Routes, Route } from 'react-router-dom';

//---- Components
import MainLayout from './pages/dashboard/Layout'
import Boxes_Layout from './pages/boxes/Layout';
import { VehicleBox, NewVehicleBox } from './pages/boxes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />} >
            
            <Route path='vehicle' element={<Boxes_Layout />}>
              <Route path=':id' element={<VehicleBox />}/>
              <Route path='edit/:id' element={<h2>VEHICLE UPDATER</h2>}/>
              <Route path='create' element={<NewVehicleBox />}/>
            </Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
