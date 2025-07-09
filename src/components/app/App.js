import { useState, useEffectб, useCallback } from "react";
import PropTypes from "prop-types";
import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import CharPage from "../charPage/CharPage";
import AppBanner from "../appBanner/AppBanner";



const App = () => {

    const [page, setPage] = useState('characters')
    const [selectedChar, setSelectedChar] = useState(null) 


    const onPageSelected = useCallback((pageName) => {
        setPage(pageName);
      }, []);
    

    const onCharSelected = (id) =>{
        setSelectedChar(id)
        
    }

    const onComicsSelected = (id) =>{
        setSelectedChar(id)
        
    }

    const content = page !== 'characters' ? <><AppBanner/><ErrorBoundary><ComicsList  onComicsSelected={onComicsSelected} page={page}/></ErrorBoundary> </> : <CharPage page={page} onCharSelected={onCharSelected} charId={selectedChar}/>
        
        return (
            <div className="app">
                <AppHeader onPageSelected={onPageSelected}/>
                <main>

                {content}

                    
                </main>
            </div>
        )
    }



App.propTypes = {
    onCharSelected: PropTypes.func
}

export default App;