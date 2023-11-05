import axios from "axios"
import { useSnackbar } from "notistack"
import { useNavigate, useParams } from "react-router-dom"

const Delete = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { enqueueSnackbar } = useSnackbar()

    const handleDeleteBook = () => {
        axios
            .delete(`http://localhost:5000/books/${id}`)
            .then(() => {
                enqueueSnackbar("Book Deleted successfully", { variant: "success" })
                navigate("/Books")
            })
            .catch((error) => {
                enqueueSnackbar("Error", { variant: "error" })
                console.log(error)
            })
    }

    return (
        <main>
            <h1>Delete Book</h1>
            <div>
                <h3>Are You Sure You want to delete this book?</h3>
                <button onClick={handleDeleteBook}>
                    Yes, Delete it
                </button>
            </div>
        </main>
    )
}

export default Delete
