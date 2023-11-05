import axios from "axios"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Edit = () => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [publishYear, setPublishYear] = useState("")
    const navigate = useNavigate()
    const { id } = useParams()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/books/${id}`)
            .then((response) => {
                setAuthor(response.data.author)
                setPublishYear(response.data.publishYear)
                setTitle(response.data.title)
            })
            .catch((error) => {
                alert("An error happened. Please Chack console")
                console.log(error)
            })
    }, [])

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear,
        }
        axios
            .patch(`http://localhost:5000/books/${id}`, data)
            .then(() => {
                enqueueSnackbar("Book Edited successfully", { variant: "success" })
                navigate("/")
            })
            .catch((error) => {
                enqueueSnackbar("Error", { variant: "error" })
                console.log(error)
            })
    }

    return (
        <main>
            <h1>Edit Book</h1>
            <div>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div>
                    <label>Publish Year</label>
                    <input
                        type="number"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                    />
                </div>
                <button onClick={handleEditBook}>
                    Save
                </button>
            </div>
        </main>
    )
}

export default Edit
