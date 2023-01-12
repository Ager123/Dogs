import './App.css';
import LandingPage from "./components/LandingPage"
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import {Route, Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component={LandingPage}/>
      {/* <Route path="/home"><Navbar/></Route> */}
      <Route exact path="/home" component={Home}/> 
      <Route exact path="/about" render={()=><About/>}/>
      </Switch>
    </div>
  );
}

export default App;
