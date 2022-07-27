import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import React, {useEffect, useState} from "react";

function MoviesCardList ({cards, load, cardLoadErr, handleCardDelete,saveMovie, savedCards,}) {

    // const [isLiked, setIsLiked] = (false)
    const [list, setList] = useState([])
    const [visible, setVisible] = useState(0)
    const [loadMoreButton, setLoadMore] = useState(false)

    const [width, setWidth] = React.useState(window.innerWidth);

React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
     window.addEventListener("resize", ()=>{
         setTimeout(handleResizeWindow, 500)
     });
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
        setList(cards)
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
       if(!savedCards) {
           return
       }
       let tst =  savedCards.find(item=> item.movieId === card.id )
       if (tst) {
           return true;
       }
       return false
    }

    return (
        <>

                {cardLoadErr ?
                    <p className="movies__error-message">Возможно, проблема с соединением или сервер недоступен.
                        Подождите немного и попробуйте ещё раз</p>
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
                                                handleCardDelete={handleCardDelete}/>
                                ))
                            }
                        </ul>
                        {loadMoreButton && <button onClick={loadMore}  type="button" className="movies__add-card-button">Еще</button>}
                    </>
}

        </>
 )
}
export default MoviesCardList;

//TODO https://habr.com/ru/company/timeweb/blog/584862/
//https://question-it.com/questions/2686377/knopka-zagruzit-esche-v-react
//https://dev.to/narendersaini32/how-to-create-load-more-logic-in-react-474m