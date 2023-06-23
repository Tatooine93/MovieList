const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        apiMovieId: {
            type: String
        },

        listId: {
            type: String
        },
        
/*         parameters: {
            need to be defined
        }, */

        downloaded: {
            type: Boolean
        },

        seen: {
            type: Boolean
        }
    },

    {
        timestamps: true
    }
);

const MovieModel = mongoose.model('message', MovieSchema);

module.exports = MovieModel;