//import { useState, useEffect } from 'react';
import imgNotFound from '../../resources/img/img-not-found.jpg'




const  CharListItem = (props)=> {


    
        
    const {name, src, onCharSelected, id, onCharActive, isActive} = props;

    return (
        <li 
        className={`char__item${isActive? '_selected': ''}`}
        tabIndex={0}
        onClick={()=>{
            onCharSelected(id)
            onCharActive(id)
        }}
        onKeyDown={(e) =>{
            if(e.key === 'Enter' || e.key === ' '){
                e.preventDefault()
                onCharActive(id)
                onCharSelected(id)
            }
        }}
        >

            <img onError={e =>{             //функция которая вставлет картинку заглушку если с сервера она не приходит 
                e.target.onerror = null;
                e.target.src = imgNotFound
            }}
            src={src} alt={name}/>
            
            <div className="char__name">{name}</div>
        </li>
    )

    }

    




export default CharListItem;




















