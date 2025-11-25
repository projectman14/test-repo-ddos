import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Biding from './components/Biding';
import Home from './components/Home';
import { useContext } from 'react';
import { AuxtionContext } from './Context/Auctioncontext';
import { NavBar } from './components/NavBar';

function App() {

  const { biding , title , image } = useContext(AuxtionContext); 

  return (
    <div className="App">
        <NavBar/>
        {biding ? <Biding title={title} imgUrl={image}/> : <Home/>}
    </div>

  );
}

export default App;
