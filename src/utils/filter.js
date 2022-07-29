export const filter =  (cards, checkBox, input) => {
    const SHORTMOVIE_LIMIT = 40
    const duration = (checkBox, duration) => {
        if (checkBox) {
            return duration > SHORTMOVIE_LIMIT
        }
        else {
            return duration <SHORTMOVIE_LIMIT
        }
    }



     const reduceSearch = (movie, term, isShort) => {
        const {
          nameRU, description, duration,
        } = movie;
      
        return (`${nameRU}  ${description}`
          .replace(',', ' ')
          .replace('.', ' ')
          .replace(':', ' ')
          .replace(';', ' ')
          .replace('-', ' ')
          .split(' ')
          .filter((word) => word.includes(term))
          .length > 0) && (!isShort || (duration < SHORTMOVIE_LIMIT));

          function finalFunction() {
            cards.map(item=> {
                if(reduceSearch(item, input) && function2(sdajsad)){
                    return item
                }
            })
          }
      };
}