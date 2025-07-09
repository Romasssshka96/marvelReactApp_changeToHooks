import { useState, useEffect } from 'react';
import Spinner from '../spiner/spiner';
import ErrorMsg from '../errorMsg/errorMsg';
import imgNotFound from '../../resources/img/img-not-found.jpg'
import './randomChar.scss';
import useMarvelService from '../../services/MarvelServices';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar =()=> {

    
    const [char, setChar] = useState({})

    const {loading, error, getOneCharacter, clearError} = useMarvelService()

   

    useEffect(()=>{
        updateCharacter();
    }, [])
  

    const onCharLoaded = (char) =>{
        setChar(char);
    }

    const updateCharacter = ()=>{
        clearError();
        const id = Math.floor(Math.random()* (20 - 1));
        //console.log(id)

        getOneCharacter(id)
        .then(onCharLoaded)
        
    }

    const altImg = () =>{
        setChar((prevState => ({
            char: {
                ...prevState.char,
                src: imgNotFound,
            },
        })))
    }



        console.log('render')
        
        const errMsg = error? <ErrorMsg/> : null;
        const spiner = loading? <Spinner/> : null;
        const content = !(loading || error)? <Viwe char={char} altImg={altImg}/>: null;
       
            return (
        <div className="randomchar">
            {errMsg}
            {spiner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateCharacter} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    


}


const Viwe = ({char}) => {

    const {name, description, src, homepage, wiki} = char




    return (
        <div className="randomchar__block">

            <img onError={e =>{
                e.target.onerror = null;
                e.target.src = imgNotFound
                }}
             src={src}  alt="Random character" className="randomchar__img"/>

            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

//onError={this.altImg} 
export default RandomChar;