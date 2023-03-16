
import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import "../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css"
function App() {
  return <div className="App">
   
     <NavBar/>
     <Outlet/>
     <Footer/>
  </div>;
}

export default App;
