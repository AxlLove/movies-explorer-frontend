import './App.css';
import {Route, Switch,} from "react-router-dom";
import React, {useState, useEffect} from "react";
import * as MoviesApi from "../../utils/MoviesApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import {slice,concat} from 'lodash'


function App() {
    const [cards, setCards] = useState([])
    const [checkBoxState, setCheckBoxState] = useState(false)
    const [inputState, setInputState] = useState('')
    const [load, setLoad] = useState(false)
    const [cardLoadErr, setCardLoadErr] = useState(false)

    function onSubmitFindMovies () {
        setCardLoadErr(false)
        setLoad(true)
        MoviesApi.getFilms().then((res)=> {
            setCards(res)
}).then(()=>{
                // console.log('submit=>', cards)
                // localStorage.setItem("filter", JSON.stringify({
                //     input: inputState,
                //     checkBox: checkBoxState,
                //     cardsList: cards,
                // }))
            })
                .catch(err=>{
                    console.log(err)
                    setCardLoadErr(true)
                })
            .finally(()=> {
                setLoad(false)
            })
}
    // useEffect(()=> {
    //  const savedFilter = JSON.parse(localStorage.getItem('filter'))
    //     if (savedFilter===null) {
    //         return
    //     }
    //     setCards(savedFilter.cardsList)
    //     setCheckBoxState(savedFilter.checkBox)
    //     setInputState(savedFilter.input)
    //     console.log(savedFilter)
    //     console.log(savedFilter.checkBox)
    //     console.log(savedFilter.input)
    //
    // },[])

    function saveInputChange (e) {
        setInputState(e.target.value)
    }
    function saveCheckBoxChange (e) {
        setCheckBoxState(e.target.checked)
    }




    return (
      <Switch>
          <Route path='/' exact>
              <div className="page">
                  <Header loggedIn={false} isMain={true}></Header>
                  <Main/>
                  <Footer/>
              </div>
          </Route>
          <Route path='/movies' >
              <div className="page">
                  <Header loggedIn={true} isMain={false}></Header>
                  <Movies cards={cards}
                          onSubmitFindMovies={onSubmitFindMovies}
                          saveInputChange={saveInputChange}
                          saveCheckBoxChange={saveCheckBoxChange}
                          checkBoxState={checkBoxState}
                          inputState={inputState}
                          load={load}
                          cardLoadErr={cardLoadErr}
                  />
                  <Footer/>
              </div>
          </Route>
          <Route path='/saved-movies' >
              <div className="page">
                  <Header loggedIn={true} isMain={false}></Header>
                  <SavedMovies></SavedMovies>
                  <Footer/>
              </div>
          </Route>  
          <Route path='/profile'>
              <div className="page">
                <Header loggedIn={true} isMain={false}/>
                <Profile/>
              </div>
          </Route>
          <Route path='/profile'>
              <div className="page">
                  <Header loggedIn={true} isMain={false}/>
                  <Profile/>
              </div>
          </Route>
          <Route path='/signup'>
              <div className="page">
                  <Register/>
              </div>
          </Route>
          <Route path='/signin'>
              <div className="page">
                  <Login/>
              </div>
          </Route>
          <Route path='*'>
              <div className="page">
                  <NotFoundPage/>
              </div>
          </Route>
      </Switch>
  );
}

export default App;


//TODO https://habr.com/ru/company/timeweb/blog/584862/
//TODO ошибка загрузки cards в localstorage
