import { useEffect } from 'react';
import {useHttp} from '../hooks/http.hook'

//const apiLink = 'https://marvel-server-zeta.vercel.app/'
//const apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df'


const useMarvelService = () => {

    const {loading, error, request, clearError} = useHttp();
    

    const _apiLink = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    const _baseOffset = 0;



    const getAllCharacters = async(offset =_baseOffset, page) =>{
        const res = await request(`${_apiLink}${page}?limit=9&offset=${offset}&${_apiKey}`);
        if(page === 'characters'){
            return res.data.results.map(_transformCharacter) //тоже ответ от сервера берем и мапаем с помощью той функции упаковщика в объект 
        }else{
            console.log(res.data.results)
            return res.data.results.map(_transformComicses)
        }
       
    }

    const getOneCharacter = async (id) =>{
        const res = await request(`${_apiLink}characters/${id}?&${_apiKey}`) //делаем асинхронный запрос на юрл за данными 
        return _transformCharacter(res.data.results[0])            //данные что пришли мы пропускаем сразу через функцию которая формирует объект из данных, и как аргумент мы ей даём путь к обекту из пришедших данных, что б не писать этот путь в каждом поле объекта 
    }

    const _transformCharacter = (char) =>{    //та самая функция которая формирует объект из респонса, принимает как аргумент в итоге тот путь к данным в матрешке объектов и массивов
        //const descr =  ? +'...' : char.description

            let descr = ''
            if (char.description.length === 0){
                descr = 'sory, description is not to come to day '
            }if (char.description.length > 20){
                descr = char.description.slice(0, 20) + '...'
            }else{descr = char.description}

            return {
                name: char.name,
                description: descr,
                src: char.thumbnail.path+ '.'+ char.thumbnail.pathextension,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                id: char.id,
                comics: char.comics.items,
            }
    }


    const _transformComicses = (comics) => {

        let descr = ''
        if (comics.description.length === 0){
            descr = 'sory, description is not to come to day '
        }if (comics.description.length > 20){
            descr = comics.description.slice(0, 20) + '...'
        }else{descr = comics.description}

        return{
            title: comics.title,
            description: descr,
            src: comics.thumbnail.path+ '.'+ comics.thumbnail.pathextension,
            pageCount: comics.pageCount,
            prices: comics.prices[0].price,
            id: comics.id,
            comics: comics.textObjects.languages,
        }
    }
    



    return{loading,error, getAllCharacters, getOneCharacter, clearError}
}

export default useMarvelService;




















