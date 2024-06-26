import Manga from "../models/Manga.js";
import FavouriteManga from "../models/FavouriteManga.js";

export const getAllFavorites = async(req, res) =>{
    try{
        const favorites = await FavouriteManga.find().populate("manga");
        console.log(favorites);
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

export const isFavouriteById = async (req, res) =>{
    const favoriteId = req.params.id;

    FavouriteManga.findById(favoriteId)
        .then((favorite) => {
            if (!favorite) {
                return res.status(404).json({ error: "Избранная манга не найдена" });
            }
            res.status(200).json({ message: "Манга найдена" });
        })
        .catch((error) => res.status(500).json({ error: 'Манга не найдена в связи с ошибкой сервера' }));
}
