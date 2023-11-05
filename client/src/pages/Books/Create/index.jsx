import axios from "axios"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
    title: yup
        .string()
        .required("This field is required"),
    description: yup
        .string()
        .required("This field is required"),
    authorId: yup
        .string()
        .required("This field is required"),
    publishYear: yup
        .number()
        .required("This field is required")
})

const Create = () => {
    const [authors, setAuthors] = useState([])
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({ resolver: yupResolver(schema) })

    useEffect(() =>{
        axios
            .get("http://localhost:5000/authors/")
            .then((response) => {
                setAuthors(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const onSubmit = (data) => {
        const book = {
            title: data.title,
            description: data.description || "",
            authorId: data.authorId,
            publishYear: data.publishYear
        }

        axios
            .post("http://localhost:5000/books", book)
            .then(() => {
                enqueueSnackbar("Book created successfully", { variant: "success" })
                navigate("/books")
            })
            .catch((error) => {
                enqueueSnackbar("Error", { variant: "error" })
                console.log(error)
            })
    }

    return (
        <main>
            <h1>Create Book</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="Enter book title"
                            />
                        )}
                    />
                    {errors.title && <span>This field is required</span>}
                </div>
                <div>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                type="text"
                                placeholder="Enter book description"
                                rows={4}
                                cols={50}
                            />
                        )}
                    />
                    {errors.description && <span>This field is required</span>}
                </div>
                <div>
                    <Controller
                        name="authorId"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                placeholder="Select the author of the book"
                                defaultValue={"DEFAULT"}
                            >
                                <option value="DEFAULT" disabled hidden>Select the author of the book</option>
                                {
                                    authors.map((author, index) => {
                                        return (
                                            <option key={index} value={author._id}>{author.name}</option>
                                        )
                                    })
                                }
                            </select>
                        )}
                    />
                    {errors.authorId && <span>This field is required</span>}
                </div>
                <div>
                    <Controller
                        name="publishYear"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                placeholder="Enter the year of publication"
                            />
                        )}
                    />
                    {errors.publishYear && <span>This field is required</span>}
                </div>

                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default Create
