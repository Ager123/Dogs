import './App.css';
import LandingPage from "./components/LandingPage/LandingPage"
import Home from './components/Home/Home';
import About from "./components/About/About"
import { CreateDog } from './components/CreateDog/CreateDog';
import {Route, Switch} from "react-router-dom";
import DogDetail from './components/DogDetail/DogDetail';

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/> 
      <Route exact path="/about" render={()=><About/>}/>
      <Route exact path="/dogs/create" component={CreateDog} />
      <Route exact path="/dogs/:id" render={()=><DogDetail/>}/>
      </Switch>
    </div>
  );
}

export default App;
