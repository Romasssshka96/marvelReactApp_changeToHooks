import './appHeader.scss';

const AppHeader = (props) => {

    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a onClick={() => props.onPageSelected('characters')}>Characters</a></li>
                    /
                    <li><a onClick={() => props.onPageSelected('comics')}>Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;