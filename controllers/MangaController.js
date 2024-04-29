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
        res.json(manga)
    }
    catch(err){
        res.status(500).json({
            message: `Не удалось получить мангу по названию: ${err}`
        });
    }
}

