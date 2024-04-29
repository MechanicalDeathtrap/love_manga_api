import mongoose from "mongoose";
import axios from "axios";
import fs from "fs";

async function mangaSeed() {
    const allManga = {
        method: 'GET',
        url: 'https://mangaverse-api.p.rapidapi.com/manga/fetch',
        params: {
            page: '10',
            nsfw: 'true',
            type: 'all'
        },
        headers: {
            'X-RapidAPI-Key': '7695f6f8f1msh0a561525519f123p110426jsn3ff1def9a897',
            'X-RapidAPI-Host': 'mangaverse-api.p.rapidapi.com'
        }
    }
    await axios
        .request(allManga)
        .then(function (response) {
            // Extract the myData from the response
            const data = response.data;

            // Convert the myData to JSON format
            const jsonData = JSON.stringify(data, null, 2);

            // Save the JSON myData to a file
            fs.writeFile("./myData/mangaMangaVerse.json", jsonData, "utf8", function (err) {
                if (err) {
                    console.error("Error writing JSON file:", err);
                    return;
                }
                console.log("Data has been seeded and saved to manga.json");
            });
        })
        .catch(function (error) {
            console.error("Error retrieving myData:", error);
        });


    /*    const allManga = {
            method: "GET",
            url: "https://myanimelist.p.rapidapi.com/manga/top/bypopularity",
            headers: {
                "X-RapidAPI-Key": '7695f6f8f1msh0a561525519f123p110426jsn3ff1def9a897',
                "X-RapidAPI-Host": "myanimelist.p.rapidapi.com",
            },
        };

        await axios
            .request(allManga)
            .then(function (response) {
                // Extract the myData from the response
                const myData = response.myData;

                // Convert the myData to JSON format
                const jsonData = JSON.stringify(myData, null, 2);

                // Save the JSON myData to a file
                fs.writeFile("./myData/manga.json", jsonData, "utf8", function (err) {
                    if (err) {
                        console.error("Error writing JSON file:", err);
                        return;
                    }
                    console.log("Data has been seeded and saved to manga.json");
                });
            })
            .catch(function (error) {
                console.error("Error retrieving myData:", error);
            });*/
}
export default mangaSeed;
/*

const ids = [
    2, 23390, 13, 116778, 33327, 44347, 121496, 75989, 4632, 96792, 11, 21, 12,
    113138, 656, 42451, 100128, 119161, 25, 642, 81117, 598, 56805, 26, 90125,
    1706, 99007, 3, 1, 564, 104565, 436, 35243, 86337, 3986, 3009, 31499, 583,
    908, 24294, 103897, 44485, 45757, 122663, 24692, 25132, 9711, 3031, 70345,
    110737, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18,19, 20, 22, 23, 24,
    27, 28, 29, 30, 31, 32,33,34,35,36,37, 40,41,42,43,44,45,46,47,48,49,50,51,
    52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77
    ,78,79,46758
];
const requests = ids.map((id) => {
    const allMangaDetails = {
        method: "GET",
        url: `https://myanimelist.p.rapidapi.com/manga/${id}`,
        headers: {
            "X-RapidAPI-Key": '7695f6f8f1msh0a561525519f123p110426jsn3ff1def9a897',
            "X-RapidAPI-Host": "myanimelist.p.rapidapi.com",
        },
    };
    return axios.request(allMangaDetails);
});

try {
    const responses = await Promise.all(requests);
    const myData = responses.map((response) => response.myData);

    fs.writeFileSync("./myData/mangaDetails.json", JSON.stringify(myData, null, 2));
    console.log("Data has been seeded and saved to mangaDetails.json");
} catch (error) {
    console.error(error);
}
*/
