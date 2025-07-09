import './comicsList.scss';
import ComicsListItem from '../comicsListItem/comicsListItem';
import Spinner from '../spiner/spiner';
import ErrorMsg from '../errorMsg/errorMsg';

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelServices';

const ComicsList = (props) => {

    const [cards, setCards] = useState([]);
    const [offset, setOffset] = useState(0) ;
    const [newItemsLoading, setNewItemsLoading] = useState(false) ;
    const [charEnded, setCharEnded] = useState(false) ;
    const [activeId, setActiveId] = useState(null);
    
    const {error, loading, getAllCharacters} = useMarvelService()
    const {onComicsSelected, page} = props

//    const [error, loading, getAllCharacters] = useMarvelService(); // без props

//useEffect(() => {
//  if (!props.page) return;
//
//  // Вызываем нужную функцию из сервиса вручную
//  if (props.page === 'characters') {
//    getAllCharacters().then(setCharacters);
//  }
//
//  if (props.page === 'comics') {
//    getAllComics().then(setComics);
//  }
//
//}, [props.page]);
//


    useEffect(()=>{
        onRequest(offset, true)
    }, [])



    const onRequest = (offset) =>{
        if (!page) return;
        console.log(page)

  // Вызываем нужную функцию из сервиса вручную
        if (page === 'comics') {
            getAllCharacters(offset, page)
            .then(onCharListLoaded);
        }
    }

    
    const onCharListLoaded = (newCards) => {

        let ended =false;
        if(newCards.length < 9){
            ended= true
        }
            setCards (cards => [...cards, ...newCards]) ;
            //setLoading (false) ;// везде колбек функции, а тут просто назначение стейта, потому что тут неважно какой был стейт до этого 
            setNewItemsLoading (newItemsLoading => false) ;
            setOffset (offset => offset + 9) ;
            setCharEnded (charEnded => ended) ;
        
    }

    const onComicsActive = (id) =>{
        setActiveId (id);
    }
    const errMsg = error? <ErrorMsg/> : null;
    const spiner = loading && !newItemsLoading? <Spinner/> : null;

    return (
        <div className="comics__list">
            <ul>
                {spiner}
                {errMsg}
                <Viwe cards={cards} onComicsSelected={onComicsSelected} onComicsActive={onComicsActive} activeId={activeId}/>
            </ul>

            <button className="button button__main button__long"
                    disabled={newItemsLoading}
                    style={{'display': charEnded? 'none': 'block'}}
                    onClick={()=>onRequest(offset)} 
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


const Viwe = ({cards, onComicsSelected, onComicsActive, activeId}) =>{

    let elements = cards.map(item => {
        return(
            <ComicsListItem
            onComicsActive={onComicsActive}
            onComicsSelected={onComicsSelected} 
            key = {item.id}
            {...item}
            isActive = {item.id === activeId}
            />
        )
    })

    return(
        <ul className="comics__grid">
            {elements}
        </ul>
    )
}





















export default ComicsList;