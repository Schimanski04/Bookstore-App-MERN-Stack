import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Main = () => {
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
            <h1>Books List</h1>
            <Link to="/books/create">Create</Link>

            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publish Year</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((book, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publishYear}</td>
                                    <td>
                                        <div>
                                            <Link to={`/books/details/${book._id}`}>Details</Link>
                                            <Link to={`/books/edit/${book._id}`}>Edit</Link>
                                            <Link to={`/books/delete/${book._id}`}>Delete</Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </main>
    )
}

export default Main
