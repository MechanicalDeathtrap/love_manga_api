//getManga
//getmangaById

import Manga from "../models/Manga.js";

export const getAllManga = async(req, res) => {
    try{
        const mangas = await Manga.find();
        res.json(mangas);
    }
    catch(err){
        res.status(500).json({
            message: `Не удалось получить мангу ${err}`
        });
    }
}

export const getMangaById = async(req, res) =>{
    try{
        const mangaId = req.params.id;
        const manga = await Manga.findById(mangaId);

        if (!manga) {
            return res.status(404).json({ error: "Данная манга не была найдена" });
        }
        res.json(manga)
    }
    catch(err){
        res.status(500).json({
            message: `Не удалось получить мангу по id: ${err}`
        });
    }
}

export const getMangaByTitle = async(req, res) =>{
    try{
        const title = req.params.title;
        const manga = await Manga.find({ title: new RegExp("^" + title, "i") });

        if (!manga) {
            return res.status(404).json({ error: "Данная манга не была найдена" });
        }
        res.status(200).json(manga)
    }
    catch(err){
        res.status(500).json({
            message: `Не удалось получить мангу по названию: ${err}`
        });
    }
}

export const getMostPopularManga = async(req, res) =>{
    try{
        const mostPopularMangas = await Manga.find({score : {$gt: 9.0, $lt: 10.0}})

        if (!mostPopularMangas){
            return res.status(404).json({error: 'Манга из данного диапазона не найдена'})
        }
        res.status(200).json(mostPopularMangas)
    }
    catch(err){
        res.status(500).json({
            message: 'Не удалось получить мангу'
        })
    }
}

export const searchManga = async (req, res) => {
    const { genres, themes, demographic, rating } = req.body;

    console.log(genres);
    let query = {};

    if (genres.length) {
        query['genres.name'] = { $in: genres };
    }

    if (themes.length) {
        query['themes.name'] = { $in: themes };
    }

    if (demographic.length) {
        query['demographic.name'] = { $in: demographic };
    }

    if (rating) {
        query['score'] = { $gte: rating };
    }
    console.log(query);
    try {
        const mangas = await Manga.find(query);
        res.json(mangas);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка поиска манги');
    }
};