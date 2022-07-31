import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import React, {useEffect, useState} from "react";

function MoviesCardList ({cards , load, cardLoadErr, handleCardDelete,saveMovie, savedCards,notFound,allSavedCards}) {

    const [list, setList] = useState([])
    const [visible, setVisible] = useState(0)
    const [loadMoreButton, setLoadMore] = useState(false)
    const [width, setWidth] = React.useState(window.innerWidth);

React.useEffect(() => {
    const resizeListener = ()=> {
        return setTimeout(()=> setWidth(window.innerWidth), 200)
    }
     window.addEventListener("resize", resizeListener);
    return ()=> {
        window.removeEventListener("resize", resizeListener);
    }
   }, [width]);
   
   function hWidth () {
    let cardVisible
    if (width>=1050) {
      return  cardVisible=9
    }
    if (width<1050 && width>=600) {
        return  cardVisible=8
    } 
    if (width<600){
        return cardVisible=5
    } 
   }
    useEffect(()=> {
      const cardVisible = hWidth()
        console.log(cards)
        if(cards){
            setList(cards)
        }else{
            setList([])
        }
        setVisible(cardVisible)
    },[cards])

    const loadMore = () => {
        let addCards
        if (width>=1050) {
            addCards=3
        }
        if (width<1050 && width>=600) {
            addCards=2
        }
        if (width<600){
            addCards=1
        } 
        setVisible(visible + addCards)
    }
    useEffect(()=> {
        const morVis = list.length>visible
        setLoadMore(morVis)
    },[visible, list])


   function checkCard (card) {
       if(!savedCards ) {
           return
       }
       let tst =  allSavedCards.find(item=> item.movieId === card.id )
       if (tst) {
           return true;
       }
       return false
    }

    return (
        <Switch>
            <Route  path={'/movies'}>
                <>
                    {cardLoadErr ?
                        <p className="movies__error-message movies__error-message_visible">Возможно, проблема с соединением или сервер недоступен.
                            Подождите немного и попробуйте ещё раз</p>
                        :
                        notFound?
                        <p className={`movies__error-message ${notFound? 'movies__error-message_visible': ''}`}>Ничего не найдено</p>
                        :
                            <>
                            <ul className={`movies__card-list ${load ? 'movies__card-list_visible': ''}`}>
                                    {

                                        list.slice(0, visible).map(card => (
                                            <MoviesCard isLiked={checkCard(card)}
                                                        card={card}
                                                        key={card.id || card.movieId}
                                                        savedCards={savedCards}
                                                        saveMovie={saveMovie}
                                                        handleCardDelete={handleCardDelete}
                                            />
                                        ))
                                    }
                                </ul>
                                {loadMoreButton && <button onClick={loadMore}  type="button" className="movies__add-card-button">Еще</button>}
                            </>

                    }
                </>
            </Route>
            <Route path={'/saved-movies'}>
                {cardLoadErr ?
                    <p className="movies__error-message">Возможно, проблема с соединением или сервер недоступен.
                        Подождите немного и попробуйте ещё раз</p>
                    :

                    notFound?
                    <p className={`movies__error-message ${notFound? 'movies__error-message_visible': ''}`}>Ничего не найдено</p>
                        :
                    <>
                        <ul className={`movies__card-list ${load ? 'movies__card-list_visible': ''}`}>
                            {
                                cards.map(card => (
                                    <MoviesCard card={card}
                                                key={card.id || card.movieId}
                                                savedCards={savedCards}
                                                saveMovie={saveMovie}
                                                handleCardDelete={handleCardDelete}/>
                                ))
                            }
                        </ul>
                    </>
                }
            </Route>
        </Switch>
 )
}
export default MoviesCardList;
