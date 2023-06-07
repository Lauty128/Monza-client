//----- Dependencies
import { Outlet } from "react-router-dom";
import { MessageBox, Header } from "@/components";

//----- Components
import { Filters, VehiclesSection } from "./components";

export default function MainLayout(){

  return(
        <>
          <Header />
    
          <main className='Main'>
              <Filters />
              <VehiclesSection />

              <Outlet /> {/* Here the boxes are loaded  */}
          </main>

          <MessageBox/>
        </>
    )
}