import mongoose from "mongoose"

const authorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        nationality: {
            type: String,
            required: true
        },
        birthYear: {
            type: Number,
            required: true
        },
        deathYear: {
            type: Number,
            required: false
        },
        // books: {
        //     type: Array,
        //     required: false
        // }
    },
    {
        timestamps: true,
    }
)

export const Author = mongoose.model("Author", authorSchema)
