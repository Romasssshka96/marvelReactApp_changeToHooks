import { CuseState, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelServices';
import CharInfoItem from '../CharInfoItem/CharInfoItem';
import Spinner from '../spiner/spiner';
import ErrorMsg from '../errorMsg/errorMsg';
import Skeleton from '../skeleton/Skeleton'
import imgNotFound from '../../resources/img/img-not-found.jpg'
import './charInfo.scss';


const CharInfo = (props)=> {
    
        const [char, setChar ] = useState(null)
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(false)
    
    
        const mService = new MarvelService()

       

    useEffect(()=>{
        updateChar()
    }, [props.charId])


    //useEffect(()=>{
    //    updateChar()
    //}, [charId])
    //componentDidUpdate(prevProps, prevState){
    //    if(this.props.charId !== prevProps.charId){
    //        this.updateChar()
    //    }
    //}

    const updateChar = () =>{
        const {charId} = props

            if(!charId){
                return
            }
            
            onCharLoading();

            mService
            .getOneCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)

            // this.foo.bar = 0  //искуственная ошибка для проверки err boundry
        }

    const onCharLoading = () => {
        setLoading(true)
    }
    
    const onCharLoaded = (char) =>{
        setChar(char)
        setLoading(false)

    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }




    
    
        
        const skeleton = char || loading || error? null: <Skeleton/>
        const errMsg = error? <ErrorMsg/> : null;
        const spiner = loading? <Spinner/> : null;
        const content = !(loading || error || !char)? <Viwe char={char}/>: null;

        
        //const element = char.map(title =>{
//
        //})


            return (
        <div className="char__info">
            {skeleton}
            {spiner}
            {errMsg}
            {content}
        </div>
    )
    

}

const Viwe = ({char}) =>{
    const {name, description, src, homepage, wiki, comics} = char
console.log(comics)

    let elements = ''

    if (comics.length === 0){
        elements = 'нема комиксов с ним'
    }
    elements = comics.map((item, i)=>{
        if(i >9){
            return
        }else{
            return(
                <CharInfoItem
                key = {i}
                title ={item}
                
                /> 
            )
        }

    })

     return(
        <>
            <div className="char__basics">

                <img onError={e =>{
                e.target.onerror = null;
                e.target.src = imgNotFound
                }} 
                src={src} alt="abyss"/>

                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href= {homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
              {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {elements}
            </ul>
            </>
     )
}


CharInfo.propTypes = {
    charId: PropTypes.number
}


export default CharInfo;