import Book from "../../../components/Book"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./index.scss"

const Index = () => {
    const [books, setBooks] = useState([])

    useEffect(() =>{
        axios
            .get("http://localhost:5000/books/")
            .then((response) => {
                setBooks(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <main>
            <h1>List of all books</h1>
            <Link to="/books/create" className="link">Create</Link>

            <div className="books">
                {
                    books.map((book, index) => {
                        return (
                            <Book key={index} book={book} />
                        )
                    })
                }
            </div>
        </main>
    )
}

export default Index
