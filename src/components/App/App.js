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
import {resultSearch} from "../../utils/filter";
import ErrorTooltip from "../ErrorTooltip/ErrorTooltip";


function App() {
    const [userParams, setUserParams] = useState({})

    const [cards, setCards] = useState([])
    const [savedCards, setSavedCards] = useState([])
    const [allSavedCards, setAllSavedCards] = useState([])

    const [notFound, setNotFound] = useState(false)
    const [checkBoxState, setCheckBoxState] = useState(false)
    const [inputState, setInputState] = useState('')
    const [load, setLoad] = useState(false)
    const [cardLoadErr, setCardLoadErr] = useState(false)

    const [savedMoviesСheckBoxState, setSavedMoviesСheckBoxState] = useState(false)
    const [savedMoviesInputState, setSavedMoviesInputState] = useState('')

    const[errorTooltip, setErrorTooltip] = useState({})

    //auth
    const [loggedIn, setLoggedIn] = useState(false)
    const [submitErrMessage, setSubmitErrMessage] = useState({})

    const history = useHistory()

    // Субмит всех фильмов и загрузка на странцу при входе
    function onSubmitFindMovies () {
        setCardLoadErr(false)
        setNotFound(false)
        const savedFilter = JSON.parse(localStorage.getItem('filter'))
            if(savedFilter) {
                const findedMovies = resultSearch(savedFilter.cardsList, checkBoxState, inputState)
                setCards(findedMovies)
                localStorage.setItem("filter", JSON.stringify({
                    input: inputState,
                    checkBox: checkBoxState,
                    cardsList: savedFilter.cardsList,
                }))
            return
            }
        setLoad(true)
        MoviesApi.getFilms().then((res)=> {
            //console.log('=>', res)
            localStorage.setItem("filter", JSON.stringify({
                input: inputState,
                checkBox: checkBoxState,
                cardsList: res,
            }))
            return res
        })
            .then((res)=> {
                const findedMovies = resultSearch(res, checkBoxState, inputState)
                if(findedMovies.length < 1) {
                    setNotFound(true)
                }
                setCards(findedMovies)
                console.log('=>>', cards)
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
         //console.log('filter2', savedFilter)
         if(loggedIn) {
             if (!savedFilter) {
                 return
             }
             //console.log('filter2', savedFilter)

             const findedMovies = resultSearch(savedFilter.cardsList, savedFilter.checkBox, savedFilter.input)
             //console.log('найденые мувисы', findedMovies)
             setCards(findedMovies)
             setCheckBoxState(savedFilter.checkBox)
             setInputState(savedFilter.input)
         }
     },[loggedIn, history])

    // контролируемые инпуты
    function saveInputChange (e) {
        setInputState(e.target.value)
    }
    function saveCheckBoxChange (e) {
        setCheckBoxState(e.target.checked)
    }
    function saveSavedMoviesInputChange (e) {
        setSavedMoviesInputState(e.target.value)
    }
    function saveSavedMoviesCheckBoxChange (e) {
        setSavedMoviesСheckBoxState(e.target.checked)
    }


     function loadSavedCards () {
        setCardLoadErr(false)
        setLoad(true)
        mainApi.getSavedFilms().then(res=> {
            setAllSavedCards(res)
            setSavedCards(res)
        })
            .catch(err=>{
                setCardLoadErr(true)
            })
            .finally(()=> {
                setLoad(false)
            })
    }
    useEffect(()=> {
        loadSavedCards ()
    }, [loggedIn,])

    function onSubmitInSavedMovies () {
            try {
                const findedMovies = resultSearch(allSavedCards, savedMoviesСheckBoxState, savedMoviesInputState)
                setSavedCards(findedMovies)
            } catch (err) {
                loadSavedCards()
                const findedMovies = resultSearch(allSavedCards, savedMoviesСheckBoxState, savedMoviesInputState)
                setSavedCards(findedMovies)
            }

    }
    useEffect( ()=> {
        if (cards && inputState.length>2) {
            onSubmitFindMovies()
        }
    }, [checkBoxState])

    function handleCardDelete (card) {
        mainApi.deleteSavedFilm(card._id).then((newCard)=> {
            setSavedCards((state)=> state.filter((c) =>c._id !== card._id))

        }).catch(err=>{
            setErrorTooltip({open: true,
            message: "При удалении фильма произошла ошибка"
            })
            tooltipClose ()
        })
    }
    function saveMovie(movie) {
        console.log(movie)
        mainApi.saveFilm(movie).then(res=> {
            setSavedCards([...savedCards, res])

        })
            .catch(err=> {
                setErrorTooltip({open: true,
                    message: "При сохранении фильма произошла ошибка"
                })
                tooltipClose ()
            })
    }


    function tooltipClose () {
        setTimeout(()=>{
            setErrorTooltip({})
        }, 3000)
    }

    function updateProfile (data) {
        setSubmitErrMessage({})
        mainApi.updateProfile(data).then(res=>{
            setUserParams(res)
        }).catch(err=>{
            if (err === 409){
                setSubmitErrMessage({err:true, message: 'Такой email уже занят'})
            }
            else {
                setSubmitErrMessage({err:true, message: 'При регистрации пользователя произошла ошибка'})
            }
        })
    }
    //auth
    const handleRegister = (name, email, password) => {
        setSubmitErrMessage({})
        return mainApi
            .register({name, email, password})
            .then(()=>{
                    history.push('/signin')
            })
            .catch(err=>{
                if (err === 409){
                    setSubmitErrMessage({err:true, message: 'Такой email уже занят'})
                }
                else {
                    setSubmitErrMessage({err:true, message: 'При регистрации пользователя произошла ошибка'})
                }
            })
    }

    const handleLogin = (email, password) => {
        setSubmitErrMessage({})
        return mainApi.login({email, password})
            .then((data)=>{
                if(!data.token){
                    return;
                }
                localStorage.setItem("jwt", data.token)
                setLoggedIn(true)
            })
            .catch(err=>{
                if (err === 401){
                    setSubmitErrMessage({err:true, message: 'Вы ввели неправильный логин или пароль'})
                }
                else {
                    setSubmitErrMessage({err:true, message: 'На сервере произошла шибка'})
                }
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

    useEffect(()=>{
        setSubmitErrMessage({})
    },[])

    function handleSignOut (){
        localStorage.removeItem('jwt')
        localStorage.removeItem('filter')
        localStorage.removeItem('savedCards')
        setCards([])
        setCheckBoxState(false)
        setInputState('')
        setLoggedIn(false)
        setSavedCards([])
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
                              savedCards={savedCards}
                              handleCardDelete={handleCardDelete}
                              notFound = {notFound}
                              loadSavedCards={loadSavedCards}
                              allSavedCards={allSavedCards}
                      />
                      <ErrorTooltip errorTooltip={errorTooltip}/>
                      <Footer/>
                  </div>
              </ProtectedRoute>
              <ProtectedRoute loggedIn={loggedIn} path='/saved-movies' >
                  <div className="page">
                      <Header loggedIn={loggedIn} isMain={false}/>
                      <SavedMovies cards={savedCards}
                                   loadSavedCards={loadSavedCards}
                                   onSubmitFindMovies={onSubmitInSavedMovies}
                                   saveInputChange={saveSavedMoviesInputChange}
                                   saveCheckBoxChange={saveSavedMoviesCheckBoxChange}
                                   checkBoxState={savedMoviesСheckBoxState}
                                   inputState={savedMoviesInputState}
                                   load={load}
                                   cardLoadErr={cardLoadErr}
                                   handleCardDelete={handleCardDelete}/>
                      <ErrorTooltip errorTooltip={errorTooltip}/>
                      <Footer/>
                  </div>
              </ProtectedRoute>
              <ProtectedRoute loggedIn={loggedIn} path='/profile'>
                  <div className="page">
                      <Header loggedIn={loggedIn} isMain={false}/>
                      <Profile handleSignOut={handleSignOut}
                      updateProfile={updateProfile}
                      submitErrMessage={submitErrMessage}
                      setSubmitErrMessage={setSubmitErrMessage}
                      />
                  </div>
              </ProtectedRoute>


          <Route path='/signup'>
              <div className="page">
                  <Register handleRegister={handleRegister}
                            submitErrMessage = {submitErrMessage}
                            setSubmitErrMessage={setSubmitErrMessage}/>
                            
              </div>
          </Route>
          <Route path='/signin'>
              <div className="page">
                  <Login
                      handleLogin={handleLogin}
                      submitErrMessage = {submitErrMessage}
                      setSubmitErrMessage={setSubmitErrMessage}
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


//TODO ошибка загрузки cards в localstorage
// TODO делать обработку ошибок
// TODO поработать над constants.js
// TODO не все карты валидны обработать ошибку
//TODO  валдация после сабмита формы поиска