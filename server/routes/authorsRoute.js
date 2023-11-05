import express from "express"
import { Author } from "../models/authorModel.js"
import { Book } from "../models/bookModel.js"

const router = express.Router()

// Route for get all authors from database
router.get("/", async (request, response) => {
    try {
        const authors = await Author.find({})
        return response.status(200).json({
            count: authors.length,
            data: authors
        })
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

// Route for get one author from database by id
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params
        const author = await Author.findById(id)
        return response.status(200).json(author)
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

// Route for update an author
router.patch("/:id", async (request, response) => {
    try {
        if (!request.body.name || !request.body.nationality || !request.body.birthYear || !request.body.deathYear) {
            return response.status(400).send({ message: "Send all required fields: name, nationality, birthYear, deathYear" })
        } else {
            const { id } = request.params
            const result = await Author.findByIdAndUpdate(id, request.body)

            if (!result) {
                return response.status(404).json({ message: "Author not found" })
            } else {
                return response.status(200).json({ message: "Author updated successfully" })
            }
        }
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

// Route for save a new author
router.post("/", async (request, response) => {
    try {
        if (!request.body.name || !request.body.nationality || !request.body.birthYear) {
            return response.status(400).send({ message: "Send all required fields: name, nationality, birthYear" })
        } else {
            const newAuthor = {
                name: request.body.name,
                nationality: request.body.nationality,
                birthYear: request.body.birthYear,
                deathYear: request.body.deathYear 
            }

            const author = await Author.create(newAuthor)
            return response.status(201).send(author)
        }
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

// Route for delete an author
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params
        const result = await Author.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).json({ message: "Author not found" })
        } else {
            await Book.deleteMany({ authorId: id }) // this line will remove all the author's books
            return response.status(200).json({ message: "Author and his/her books deleted successfully" })
        }
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

export default router
