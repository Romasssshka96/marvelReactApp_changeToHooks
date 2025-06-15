

//const apiLink = 'https://marvel-server-zeta.vercel.app/'
//const apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df'


class MarvelService {
    _apiLink = 'https://marvel-server-zeta.vercel.app/';
    _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    _baseOffset = 0;
    getResourse = async(url) => {
        let res = await fetch(url);
    
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
            
        }
    
        return await res.json()
    }

    getAllCharacters = async(offset = this._baseOffset) =>{
        const res = await this.getResourse(`${this._apiLink}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter) //тоже ответ от сервера берем и мапаем с помощью той функции упаковщика в объект 
    }

    getOneCharacter = async (id) =>{
        const res = await this.getResourse(`${this._apiLink}characters/${id}?&${this._apiKey}`) //делаем асинхронный запрос на юрл за данными 
        return this._transformCharacter(res.data.results[0])            //данные что пришли мы пропускаем сразу через функцию которая формирует объект из данных, и как аргумент мы ей даём путь к обекту из пришедших данных, что б не писать этот путь в каждом поле объекта 
    }

    _transformCharacter = (char) =>{    //та самая функция которая формирует объект из респонса, принимает как аргумент в итоге тот путь к данным в матрешке объектов и массивов
        let descr = ''
        if (char.description.length === 0){
            descr = 'sory, description is not to come to day '
        }if (char.description.length > 20){
            descr = char.description.slice(0, 20) + '...'
        }else{descr = char.description}
        //const descr =  ? +'...' : char.description

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
}

export default MarvelService;




















