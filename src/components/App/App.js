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
import { mainApi } from '../../utils/MainApi';
import {useHistory} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {UserContext} from "../../contexts/UserContext";


function App() {
    const [userParams, setUserParams] = useState({})

    const [cards, setCards] = useState([])
    const [savedCards, setSavedCards] = useState([])
    const [checkBoxState, setCheckBoxState] = useState(false)
    const [inputState, setInputState] = useState('')
    const [load, setLoad] = useState(false)
    const [cardLoadErr, setCardLoadErr] = useState(false)
    const [liked, setLiked] = useState(false)

    //auth
    const [loggedIn, setLoggedIn] = useState(false)
    const [successfully, setSuccessfully] = useState(true)

    const history = useHistory()
    function onSubmitFindMovies () {
        setCardLoadErr(false)
        setLoad(true)
        MoviesApi.getFilms().then((res)=> {
            setCards(res)
        })
            .then(()=>{
                console.log('submit=>', cards)
                localStorage.setItem("filter", JSON.stringify({
                    input: inputState,
                    checkBox: checkBoxState,
                    cardsList: cards,
                }))
            })
            .catch(err=>{
                console.log(err)
                setCardLoadErr(true)
            })
            .finally(()=> {
                setLoad(false)
            })
}
     useEffect(()=> {
      const savedFilter = JSON.parse(localStorage.getItem('filter'))
         if (savedFilter===null) {
             return
         }
         setCards(savedFilter.cardsList)
         setCheckBoxState(savedFilter.checkBox)
         setInputState(savedFilter.input)
    
     },[])

    function saveInputChange (e) {
        setInputState(e.target.value)
    }
    function saveCheckBoxChange (e) {
        setCheckBoxState(e.target.checked)
    }

    function showSavedCards () {
        setCardLoadErr(false)
        setLoad(true)
        mainApi.getSavedFilms().then(res=> {
            setSavedCards(res)
        })
            .catch(err=>{
                console.log(err)
                setCardLoadErr(true)
            })
            .finally(()=> {
                setLoad(false)
            })
    }
    function handleCardDelete (card) {
        mainApi.deleteSavedFilm(card._id).then((newCard)=> {
            setSavedCards((state)=> state.filter((c) =>c._id !== card._id))
        }).catch(console.log)
    }
    function saveMovie(movie) {
        mainApi.saveFilm(movie).then(res=> {
            console.log(res)
        })
    }


    //auth
    const handleRegister = (name, email, password) => {
        return mainApi
            .register({name, email, password})
            .then(()=>{
                    setSuccessfully(true)
                }
            )
            .then(()=>{
                if (successfully) {
                    history.push('/signin')
                }
            })
            .catch(res=>{
                console.log('=>',res)
                setSuccessfully(false)
            })
    }

    const handleLogin = (email, password) => {
        return mainApi.login({email, password})
            .then((data)=>{
                if(!data.token){
                    return;
                }
                localStorage.setItem("jwt", data.token)
                setLoggedIn(true)
            })
            .catch(res=>{
                console.log(res)
                setSuccessfully(false)
            })
    }

    const tokenCheck = () =>{
        if (localStorage.getItem("jwt")){
            mainApi.getProfile()
                .then(data=>{
                    setUserParams(data)
                    setLoggedIn(true)
                    console.log(data)
                })
                .catch(console.log)
        }
    }

    useEffect(()=>{
        tokenCheck()
    },[loggedIn])

    useEffect(()=>{
        if(loggedIn) {
            history.push('/')
            return;
        }
    }, [loggedIn])

    function handleSignOut (){
        localStorage.removeItem('jwt')
        setLoggedIn(false)
    }


    return (
        <UserContext.Provider value={userParams}>
      <Switch>
              <Route path='/' exact>
                  <div className="page">
                      <Header loggedIn={loggedIn} isMain={true}/>
                      <Main/>
                      <Footer/>
                  </div>
              </Route>

              <ProtectedRoute loggedIn={loggedIn} path='/movies' >
                  <div className="page">
                      <Header loggedIn={loggedIn} isMain={false}/>
                      <Movies cards={cards}
                              onSubmitFindMovies={onSubmitFindMovies}
                              saveInputChange={saveInputChange}
                              saveCheckBoxChange={saveCheckBoxChange}
                              checkBoxState={checkBoxState}
                              inputState={inputState}
                              load={load}
                              cardLoadErr={cardLoadErr}
                              saveMovie={saveMovie}
                      />
                      <Footer/>
                  </div>
              </ProtectedRoute>
              <ProtectedRoute loggedIn={loggedIn} path='/saved-movies' >
                  <div className="page">
                      <Header loggedIn={loggedIn} isMain={false}/>
                      <SavedMovies cards={savedCards}
                                   showSavedCards={showSavedCards}
                                   onSubmitFindMovies={onSubmitFindMovies}
                                   saveInputChange={saveInputChange}
                                   saveCheckBoxChange={saveCheckBoxChange}
                                   checkBoxState={checkBoxState}
                                   inputState={inputState}
                                   load={load}
                                   cardLoadErr={cardLoadErr}
                                   handleCardDelete={handleCardDelete}/>
                      <Footer/>
                  </div>
              </ProtectedRoute>
              <ProtectedRoute loggedIn={loggedIn} path='/profile'>
                  <div className="page">
                      <Header loggedIn={loggedIn} isMain={false}/>
                      <Profile handleSignOut={handleSignOut}/>
                  </div>
              </ProtectedRoute>


          <Route path='/signup'>
              <div className="page">
                  <Register handleRegister={handleRegister}
                            successfully={successfully}/>
              </div>
          </Route>
          <Route path='/signin'>
              <div className="page">
                  <Login
                      handleLogin={handleLogin}
                      successfully={successfully}
                  />
              </div>
          </Route>
          <Route path='*'>
              <div className="page">
                  <NotFoundPage/>
              </div>
          </Route>
      </Switch>
        </UserContext.Provider>
  );
}

export default App;


//TODO https://habr.com/ru/company/timeweb/blog/584862/
//TODO ошибка загрузки cards в localstorage
// TODO делать обработку ошибок
