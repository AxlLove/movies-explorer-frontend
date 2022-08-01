import {SHORTMOVIE_LIMIT} from "../config/constants";

    const duration = (checkBox, duration) => {
        if (checkBox) {
            return duration < SHORTMOVIE_LIMIT

        }
        else {
            return duration > SHORTMOVIE_LIMIT
        }

    }

     const reduceSearch = (movie, term) => {
        const {
          nameRU, nameEn, description, director, country
        } = movie;
        const textField = (`${nameRU}  ${description} ${nameEn}, ${nameEn} ${director} ${country}`
            .toLowerCase()
            .replace(',', ' ')
            .replace('.', ' ')
            .replace(':', ' ')
            .replace(';', ' ')
            .replace('-', ' ')
            .split(' '))
         const termField = term
             .toLowerCase()
             .replace(',', ' ')
             .replace('.', ' ')
             .replace(':', ' ')
             .replace(';', ' ')
             .replace('-', ' ')
             .split(' ')
         return textField.find((word)=> termField.includes(word))

     }
    export const resultSearch = (cards, checkBox, input) => {
        let arr = []
        cards.forEach((item)=>{
            if (reduceSearch(item, input)  && duration(checkBox, item.duration)) {
                arr.push(item)
            }
            else {
                return;
            }
        })
        return arr;
    }
