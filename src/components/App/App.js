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
import ProtectedAuthRoute from '../ProtectedAuthRoute/ProtectedAuthRoute';

function App() {
    const [userParams, setUserParams] = useState({})

    const [cards, setCards] = useState([])

    const [savedCards, setSavedCards] = useState([])
    const [allSavedCards, setAllSavedCards] = useState([])

    const [checkBoxState, setCheckBoxState] = useState(false)
    const [inputState, setInputState] = useState('')
    const [load, setLoad] = useState(false)
    
    const [savedMoviesCheckBoxState, setSavedMoviesCheckBoxState] = useState(false)
    const [savedMoviesInputState, setSavedMoviesInputState] = useState('')

    //errs
    const [cardLoadErr, setCardLoadErr] = useState(false)
    const[errorTooltip, setErrorTooltip] = useState({})
    const [successful, setSuccessful] = useState(false)
    const [notFound, setNotFound] = useState(false)
    //auth
    const [loggedIn, setLoggedIn] = useState(false)
    const [submitErrMessage, setSubmitErrMessage] = useState({})
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)

    const history = useHistory()

    function onSubmitFindMovies () {
        setCardLoadErr(false)
        setNotFound(false)

        const savedFilter = JSON.parse(localStorage.getItem('filter'))
        console.log(savedFilter)
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
            setLoad(true)
            MoviesApi.getFilms().then((res)=> {
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
            })
            .catch(err=>{
                console.log(err)
                setCardLoadErr(true)
            })
            .finally(()=> {
                setLoad(false)
            })
        }


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

//savedmovs
     function loadSavedCards () {
        setNotFound(false)
        setCardLoadErr(false)
        setSavedMoviesInputState('')
        setSavedMoviesCheckBoxState(false)
        mainApi.getSavedFilms().then(res=> {
            setAllSavedCards(res)
            setSavedCards(res)
        })
            .catch(err=>{
                setCardLoadErr(true)
            })

    }

    function onSubmitInSavedMovies () {
        setNotFound(false)
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

//like/dislike
    function handleCardDelete (card) {
        mainApi.deleteSavedFilm(card._id).then(()=> {
            setSavedCards((state)=> state.filter((c) =>c._id !== card._id))
            setAllSavedCards((state)=> state.filter((c) =>c._id !== card._id))

        }).catch(()=>{
            setErrorTooltip({open: true,
            message: "При удалении фильма произошла ошибка"
            })
            tooltipClose ()
        })
    }
    function saveMovie(movie) {
        mainApi.saveFilm(movie).then(res=> {
            setSavedCards([...savedCards, res])
            setAllSavedCards([...savedCards, res])

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
            setUserParams(res)
            setSuccessful(true)
            setTimeout(()=>{
                setSuccessful(false)
            }, 3000)
        }).catch(err=>{

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
        }).finally(()=> {
            setSubmitButtonDisabled(true)
        })
    }

    //auth
    const handleRegister = (name, email, password) => {
        setSubmitErrMessage({})
        setSubmitButtonDisabled(false)
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
            .finally(()=>{
                setSubmitButtonDisabled(true)
            })
    }

    const handleLogin = (email, password) => {
        setSubmitButtonDisabled(false)
        setSubmitErrMessage({})
        return mainApi.login({email, password})
            .then((data)=>{
                if(!data.token){
                    return;
                }
                localStorage.setItem("jwt", data.token)
                setLoggedIn(true)

                history.push('/')
            })
            .catch(err=>{
                if (err === 401){
                    setSubmitErrMessage({err:true, message: 'Вы ввели неправильный логин или пароль'})
                }
                else {
                    setSubmitErrMessage({err:true, message: 'На сервере произошла шибка'})
                }
            })
            .finally(()=>{
                setSubmitButtonDisabled(true)
            })
    }

    const tokenCheck = () =>{
        if (localStorage.getItem("jwt")){
            mainApi.getProfile()
                .then(data=>{
                    setUserParams(data)
                    setLoggedIn(true)
                })
                .catch(console.log)
        }
    }
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
    

    useEffect(()=> {
        if(loggedIn) {
            loadSavedCards ()
            setSavedMoviesInputState('')
            setSavedMoviesCheckBoxState(false)
        }
    }, [loggedIn, history])

    useEffect( ()=> {
        if (cards && inputState.length>2) {
            onSubmitFindMovies()
        }
    }, [checkBoxState])

    useEffect(()=> {
        if(savedMoviesInputState.length>2) {
            onSubmitInSavedMovies ()
        } 
    }, [savedMoviesCheckBoxState])

    useEffect(()=>{
        tokenCheck()
    },[loggedIn])


    useEffect(()=>{
        setSubmitErrMessage({})
    },[])

    useEffect(()=> {
        const savedFilter = JSON.parse(localStorage.getItem('filter'))
        if(loggedIn) {
            if (!savedFilter) {
                return
            }
            const findedMovies = resultSearch(savedFilter.cardsList, savedFilter.checkBox, savedFilter.input)
            setCards(findedMovies)
            setCheckBoxState(savedFilter.checkBox)
            setInputState(savedFilter.input)
        }
    },[loggedIn, history])

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


          <ProtectedAuthRoute loggedIn={loggedIn} path='/signup'>
              <div className="page">
                  <Register handleRegister={handleRegister}
                            submitErrMessage = {submitErrMessage}
                            setSubmitErrMessage={setSubmitErrMessage}
                            submitButtonDisabled={submitButtonDisabled}
                  />
                            
              </div>
          </ProtectedAuthRoute>
          <ProtectedAuthRoute loggedIn={loggedIn} path='/signin'>
              <div className="page">
                  <Login
                      handleLogin={handleLogin}
                      submitErrMessage = {submitErrMessage}
                      setSubmitErrMessage={setSubmitErrMessage}
                      submitButtonDisabled={submitButtonDisabled}
                  />
              </div>
          </ProtectedAuthRoute>
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