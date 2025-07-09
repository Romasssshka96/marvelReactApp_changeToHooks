import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelServices';
import CharListItem from '../CharListItem/CharListItem';
import Spinner from '../spiner/spiner';
import ErrorMsg from '../errorMsg/errorMsg';

import './charList.scss';


const CharList =(props)=> {

            const [cards, setCards] = useState([]) ;
            const [newItemsLoading, setNewItemsLoading] = useState(false) ;
            const [offset, setOffset] = useState(0) ;
            const [charEnded, setCharEnded] = useState(false) ;
            const [activeId, setActiveId] = useState(null);


    const {loading, error, getAllCharacters} = useMarvelService();


    useEffect(()=>{
        onRequest(offset, true)
    }, [])


    const onRequest = (offset, initial) => {
        initial? setNewItemsLoading(false): setNewItemsLoading(true)
        
        getAllCharacters(offset, props.page)
        .then(onCharListLoaded)
        
    }



    //const onCharLoading = () => {
    //        setLoading = true
    //    
    //}


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

    const onCharLaded = (char) =>{
            char() ;
            loading(false);
        
    }
    

    
    const onCharActive = (id) =>{
        setActiveId (id);
    }


    
        const {onCharSelected} = props
        
        
        const errMsg = error? <ErrorMsg/> : null;
        const spiner = loading && !newItemsLoading? <Spinner/> : null;
        //const content = !(loading || error)? <Viwe cards={cards} onCharSelected={onCharSelected} onCharActive={onCharActive} activeId={activeId}/>: null;
 
        console.log('charList!')
        return (
                <div className="char__list">
            <ul className="char__grid">
                {spiner}
                {errMsg}
             {/*   {content}*/}
             <Viwe cards={cards} onCharSelected={onCharSelected} onCharActive={onCharActive} activeId={activeId}/>
            </ul>

            <button 
            disabled={newItemsLoading}
            style={{'display': charEnded? 'none': 'block'}}
            onClick={()=>onRequest(offset)} 
            className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>

        </div>
    )
    

}

const Viwe =({cards, onCharSelected, onCharActive, activeId})=>{

    
    let elements = cards.map(item => {

        return(
            <CharListItem
            onCharActive = {onCharActive}
            onCharSelected = {onCharSelected}
            key = {item.id}
            {...item}
            isActive = {item.id === activeId}
            />
        )

    }) 

    return(
    <ul className="char__grid">
        {elements}
    </ul>
    )

}



export default CharList;