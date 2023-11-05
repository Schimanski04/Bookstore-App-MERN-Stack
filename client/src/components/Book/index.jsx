import { Link } from "react-router-dom"
import "./book.scss"

const Book = ({ book }) => {
    return (
        <div className="book">
            <p>{book.title}</p>
            {/* <p>{book.description}</p> */}
            {/* <p>{book.authorId}</p> */}
            <p>{book.publishYear}</p>

            <Link to={`/books/details/${book._id}`}>Details</Link>
            <Link to={`/books/edit/${book._id}`}>Edit</Link>
            <Link to={`/books/delete/${book._id}`}>Delete</Link>
        </div>
    )
}

export default Book
