import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { Link, useLocation } from "react-router-dom"
import "./header.scss"

const Header = () => {
    const location = useLocation()

    return (
        <header className="header">
            <Link to="/" className="logo">Bookstoria.</Link>

            <nav className="navbar">
                {
                    location.pathname == "/" ? <Link to="/" className="active">Home</Link> : <Link to="/">Home</Link>
                }
                {
                    location.pathname == "/books" ? <Link to="/books" className="active">Books</Link> : <Link to="/books">Books</Link>
                }
                {
                    location.pathname == "/authors" ? <Link to="/authors" className="active">Authors</Link> : <Link to="/authors">Authors</Link>
                }
                {
                    location.pathname == "/about" ? <Link to="/about" className="active">About</Link> : <Link to="/about">About</Link>
                }
            </nav>

            <div className="social-media">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
        </header>
    )
}

export default Header
