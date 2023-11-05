import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useDocumentTitle from "../../../hooks/useDocumentTitle"

const Details = () => {
    useDocumentTitle("Bookstoria. – Details page")
    const [book, setBook] = useState({})
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/books/${id}`)
            .then((response) => {
                setBook(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <main>
            <div>
                <div>
                    <span>Id: {book._id}</span>
                </div>
                <div>
                    <span>Title: {book.title}</span>
                </div>
                <div>
                    <span>Author: {book.author}</span>
                </div>
                <div>
                    <span>Publish Year: {book.publishYear}</span>
                </div>
                <div>
                    <span>Create Time: {new Date(book.createdAt).toString()}</span>
                </div>
                <div>
                    <span>Last Update Time: {new Date(book.updatedAt).toString()}</span>
                </div>
            </div>
        </main>
    )
}

export default Details
