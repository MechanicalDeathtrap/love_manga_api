import * as mongoose from "mongoose";

/*    myanimelist_url: manga.myanimelist_url,
    title: manga.title,
    picture_url: manga.picture_url,
    score: manga.score,
    synopsis: manga.synopsis,
    firstTenPages: manga.firstTenPages,*/

const CommentsSchema = new mongoose.Schema( {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    })


const MangasSchema = new mongoose.Schema({
        myanimelist_url: String,
        title: {
            type: String,
            required: true
        },
        jp_title: {
            type: String
        },
        synopsis: {
            type: String,
            required: true
        },
        score:{
            type: Number,
            default: 0
        },
        genres:{
            type: Array,
            default: []
        },
        themes:{
          type: Array,
          default: []
        },
        demographic:{
            type: Array,
            default: []
        },
        picture_url: {
          type: String,
          default: 'defaultUrl'
        },
        pages:{
            type: Array,
            default: []
        },
        comments:{
            type: [CommentsSchema],
            default: []
        }
    });
export default mongoose.model('Manga', MangasSchema);