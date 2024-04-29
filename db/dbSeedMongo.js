import Manga from "../models/Manga.js";
import manga from "../data/manga.json" assert { type: "json" };
import details from "../data/mangaDetails.json" assert { type: "json" };

//Manga Data
let mangaData = manga.map((manga, index) => {
  //console.log(details[index]);

  return {
    myanimelist_url: manga.myanimelist_url,
    title: manga.title,
    picture_url: manga.picture_url,
    score: manga.score,
    synopsis: manga.synopsis,
    pages: manga.firstTenPages,
    comments: [],
    genres: details[index]?.information.genres,
    themes: details[index]?.information.themes,
    jp_title: details[index]?.alternative_titles.japanese,
    demographic: details[index]?.information.demographic
  };
});

export const makeManga = async () => {
  try {
    /*    await Manga.deleteMany();
        await Manga.create(mangaData);*/
    console.log("Mangas created and seeded");
    //console.log(mangaData);
  } catch (error) {
    console.error("Error: ", error);
  }
};

