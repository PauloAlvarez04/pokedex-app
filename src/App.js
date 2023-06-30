import logo from './logo.svg';
import './App.css';
import Navbar from './componentes/navbar/navbar';
import Pokedex from './componentes/pokedex';



function App() {
 
  return (
    <>
    <Navbar />
    

    <div className='contmain'>
      <Pokedex />
      

    </div>
    </>
  )
}

export default App;
