import './App.css';
import {Route, Switch,} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function App() {
  return (
      <Switch>
          <Route path='/' exact>
              <div className="App">
                  <Header loggedIn={false} isMain={true}></Header>
                  <Main/>
                  <Footer/>
              </div>
          </Route>
          <Route path='/movies' >
              <div className="App">
                  <Header loggedIn={true} isMain={false}></Header>
                  <Movies></Movies>
                  <Footer/>
              </div>
          </Route>
          <Route path='/saved-movies' >
              <div className="App">
                  <Header loggedIn={true} isMain={false}></Header>
                  <SavedMovies></SavedMovies>
                  <Footer/>
              </div>
          </Route>  
          <Route path='/profile'>
              <div className="App">
                <Header loggedIn={true} isMain={false}/>
                <Profile/>
              </div>
          </Route>
          <Route path='/profile'>
              <div className="App">
                  <Header loggedIn={true} isMain={false}/>
                  <Profile/>
              </div>
          </Route>
          <Route path='/signup'>
              <div className="App">
                  <Register/>
              </div>
          </Route>
          <Route path='/signin'>
              <div className="App">
                  <Login/>
              </div>
          </Route>
          <Route path='*'>
              <div className="App">
                  <NotFoundPage/>
              </div>
          </Route>
      </Switch>
  );
}

export default App;

//TODO почистить импорты .css
//TODO описать все ховеры и анимации]
