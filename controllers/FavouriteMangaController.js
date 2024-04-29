import Manga from "../models/Manga.js";
import FavouriteManga from "../models/FavouriteManga.js";

export const getAllFavorites = async(req, res) =>{
    try{
        const favorites = await FavouriteManga.find().populate("manga");

        res.json(favorites);
    }
    catch(err){
        res.status(500).json({
            message: `Не удалось получить избранную мангу: ${err}`
        });
    }
}

export const addFavoriteManga = async (req, res) => {
    try {
        const mangaId = req.params.id;
        const manga = await Manga.findById(mangaId);

        console.log(manga);
        if (!manga) {
            return res.status(404).json({ message: "Манга не найдена" });
        }

        const isAlreadyFavorite = await FavouriteManga.findOne({ manga: mangaId });
        if (isAlreadyFavorite) {
            return res.status(200).json({ isAlreadyFavorite: true });
        }

        const favorite = new FavouriteManga({ manga: mangaId });
        await favorite.save();
        res.status(200).json({ favorite });

    } catch (error) {
        res.status(500).json({ message: "Манга не была добавлена в избранное" });
    }
}

export const deleteFavorite = async (req, res) => {
    const favoriteId = req.params.id;

    FavouriteManga.findByIdAndDelete(favoriteId)
        .then((favorite) => {
            if (!favorite) {
                return res.status(404).json({ error: "Избранная манга не найдена" });
            }
            res.json({ message: "Манга удалена из избранных" });
        })
        .catch((error) => res.status(500).json({ error: 'Манга не была удалена из избранного' }));
}