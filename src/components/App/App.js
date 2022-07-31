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

    const [savedMoviesCheckBoxState, setSavedMoviesCheckBoxState] = useState(false)
    const [savedMoviesInputState, setSavedMoviesInputState] = useState('')

    const[errorTooltip, setErrorTooltip] = useState({})

    const [successful, setSuccessful] = useState(false)
    //auth
    const [loggedIn, setLoggedIn] = useState(false)
    const [submitErrMessage, setSubmitErrMessage] = useState({})
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

    const history = useHistory()

    // Субмит всех фильмов и загрузка на странцу при входе
    function onSubmitFindMovies () {
        setCardLoadErr(false)
        setNotFound(false)

        const savedFilter = JSON.parse(localStorage.getItem('filter'))
            if(savedFilter) {
                const findedMovies = resultSearch(savedFilter.cardsList, checkBoxState, inputState)
                setCards(findedMovies)
                if(findedMovies.length < 1) {
                    setNotFound(true)
                }
                localStorage.setItem("filter", JSON.stringify({
                    input: inputState,
                    checkBox: checkBoxState,
                    cardsList: savedFilter.cardsList,
                }))
            return
            }
        setSubmitButtonDisabled(true)
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
                setSubmitButtonDisabled(false)
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
             console.log('filter2', savedFilter)

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
        setSavedMoviesCheckBoxState(e.target.checked)
    }


     function loadSavedCards () {
        setNotFound(false)
        setCardLoadErr(false)
         setSavedMoviesInputState('')
         setSavedMoviesCheckBoxState(false)
         setSubmitButtonDisabled(true)
        mainApi.getSavedFilms().then(res=> {
            setAllSavedCards(res)
            setSavedCards(res)
            setSubmitButtonDisabled(false)
        })
            .catch(err=>{
                setCardLoadErr(true)
            })

    }
    useEffect(()=> {
        loadSavedCards ()
        setSavedMoviesInputState('')
        setSavedMoviesCheckBoxState(false)

    }, [loggedIn, history])

    function onSubmitInSavedMovies () {
            try {
                const findedMovies = resultSearch(allSavedCards, savedMoviesCheckBoxState, savedMoviesInputState)
                if(findedMovies.length < 1) {
                    setNotFound(true)
                }
                setSavedCards(findedMovies)
            } catch (err) {
                loadSavedCards()
                const findedMovies = resultSearch(allSavedCards, savedMoviesCheckBoxState, savedMoviesInputState)
                if(findedMovies.length < 1) {
                    setNotFound(true)
                }
                setSavedCards(findedMovies)
            }

    }
    useEffect( ()=> {
        if (cards && inputState.length>2) {
            onSubmitFindMovies()
        }
    }, [checkBoxState])

    function handleCardDelete (card) {
        mainApi.deleteSavedFilm(card._id).then(()=> {
            setSavedCards((state)=> state.filter((c) =>c._id !== card._id))

        }).catch(()=>{
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
        setSubmitButtonDisabled(false)
        mainApi.updateProfile(data).then(res=>{
            setSubmitButtonDisabled(true)
            setUserParams(res)
            setSuccessful(true)
            setTimeout(()=>{
                setSuccessful(false)
            }, 3000)
        }).catch(err=>{
            setSubmitButtonDisabled(true)
            if (err === 409){
                setSubmitErrMessage({err:true, message: 'Такой email уже занят'})
                setTimeout(()=>{
                    setSubmitErrMessage({})
                }, 3000)
            }
            else {
                setSubmitErrMessage({err:true, message: 'При регистрации пользователя произошла ошибка'})
                setTimeout(()=>{
                    setSubmitErrMessage({})
                }, 3000)
            }
        })
    }
    //auth
    const handleRegister = (name, email, password) => {
        setSubmitErrMessage({})
        setSubmitButtonDisabled(false)
        return mainApi
            .register({name, email, password})
            .then(()=>{
                    setSubmitButtonDisabled(true)
                    history.push('/signin')
            })
            .catch(err=>{
                setSubmitButtonDisabled(true)
                if (err === 409){
                    setSubmitErrMessage({err:true, message: 'Такой email уже занят'})
                }
                else {
                    setSubmitErrMessage({err:true, message: 'При регистрации пользователя произошла ошибка'})
                }
            })
    }

    const handleLogin = (email, password) => {
        setSubmitButtonDisabled(false)
        setSubmitErrMessage({})
        setSubmitButtonDisabled(true)
        return mainApi.login({email, password})
            .then((data)=>{
                if(!data.token){
                    return;
                }
                localStorage.setItem("jwt", data.token)
                setLoggedIn(true)
                setSubmitButtonDisabled(true)
                history.push('/')
            })
            .catch(err=>{
                if (err === 401){
                    setSubmitButtonDisabled(true)
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
                                   checkBoxState={savedMoviesCheckBoxState}
                                   inputState={savedMoviesInputState}
                                   load={load}
                                   cardLoadErr={cardLoadErr}
                                   handleCardDelete={handleCardDelete}
                                   notFound = {notFound}/>

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
                      successful={successful}
                      submitButtonDisabled={submitButtonDisabled}
                      />
                  </div>
              </ProtectedRoute>


          <Route path='/signup'>
              <div className="page">
                  <Register handleRegister={handleRegister}
                            submitErrMessage = {submitErrMessage}
                            setSubmitErrMessage={setSubmitErrMessage}
                            submitButtonDisabled={submitButtonDisabled}
                  />
                            
              </div>
          </Route>
          <Route path='/signin'>
              <div className="page">
                  <Login
                      handleLogin={handleLogin}
                      submitErrMessage = {submitErrMessage}
                      setSubmitErrMessage={setSubmitErrMessage}
                      submitButtonDisabled={submitButtonDisabled}
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
//TODO  валдация после сабмита формы поиска