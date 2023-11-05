import express from "express"
import { Book } from "../models/bookModel.js"
import { Author } from "../models/authorModel.js"

const router = express.Router()

// Route for get all books from database
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({})
        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

// Route for get one book from database by id
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params
        const book = await Book.findById(id)
        return response.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

// Route for update a book
router.patch("/:id", async (request, response) => {
    try {
        if (!request.body.title || !request.body.authorId || !request.body.publishYear) {
            return response.status(400).send({ message: "Send all required fields: title, author, publishYear" })
        } else {
            const { id } = request.params
            const result = await Book.findByIdAndUpdate(id, request.body)

            if (!result) {
                return response.status(404).json({ message: "Book not found" })
            } else {
                return response.status(200).json({ message: "Book updated successfully" })
            }
        }
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

// Route for save a new book
router.post("/", async (request, response) => {
    try {
        if (!request.body.title || !request.body.description || !request.body.authorId || !request.body.publishYear) {
            return response.status(400).send({ message: "Send all required fields: title, description, authorId, publishYear" })
        } else {
            // const author = await Author.findById(request.body.authorId)
            const newBook = {
                title: request.body.title,
                description: request.body.description,
                // author: {
                //     name: author.name,
                //     nationality: author.nationality,
                //     birthYear: author.birthYear,
                //     deathYear: author.deathYear
                // },
                authorId: request.body.authorId,
                publishYear: request.body.publishYear
            }

            const book = await Book.create(newBook)
            return response.status(201).send(book)
        }
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

// Route for delete a book
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params
        const result = await Book.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).json({ message: "Book not found" })
        } else {
            return response.status(200).json({ message: "Book deleted successfully" })
        }
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

export default router
