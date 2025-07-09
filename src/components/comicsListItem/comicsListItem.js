import imgNotFound from '../../resources/img/page-not-found-688965_1280.png'


const ComicsListItem = (props) =>{
    const {src, description, prices} = props
    return(
        <li className="comics__item">
            <a href="#">
                <img 
                             onError={e =>{             //функция которая вставлет картинку заглушку если с сервера она не приходит 
                                e.target.onerror = null;
                                e.target.src = imgNotFound
                            }}
                            
                src={src} 
                alt="ultimate war" 
                className="comics__item-img"/>
                <div className="comics__item-name">{description}</div>
                <div className="comics__item-price">{prices}</div>
            </a>
        </li>
    )
}

export default ComicsListItem




































