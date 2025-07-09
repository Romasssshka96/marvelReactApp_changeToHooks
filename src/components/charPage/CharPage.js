import { useState, useEffect } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';



const CharPage = (props) =>{

    const {onCharSelected, charId, page, test} = props

    return(
        <>                
            <RandomChar/>
        
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} page={page} test={test}/>
                </ErrorBoundary>

                <ErrorBoundary>
                    <CharInfo charId={charId} page={page}/>
                </ErrorBoundary>

            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )

}

export default CharPage;







































