import * as mongoose from "mongoose";

const FavouriteMangaSchema = new mongoose.Schema({
    manga: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Manga',
    }});

export default mongoose.model('FavouriteManga', FavouriteMangaSchema);