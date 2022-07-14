import './App.css';
import {Route, Switch,} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  return (
      <Switch>
          <Route path='/' exact>
              <div className="App">
                  <Header loggedIn={true} isMain={true}></Header>
                  <Main/>
                  <Footer/>
              </div>
          </Route>
          <Route path='/movies' >
              <div className="App">
                  <Header loggedIn={true} isMain={false}></Header>
                  <Footer/>
              </div>
          </Route>
          <Route path='/signup'>
              <div className="App">
                  <Footer/>
              </div>
          </Route>
      </Switch>
  );
}

export default App;

//TODO почистить импорты .css
//TODO описать поведение кнопок
