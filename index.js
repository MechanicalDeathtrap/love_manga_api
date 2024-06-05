import express from 'express';
import mongoose from 'mongoose';
import {loginValidation, registerValidation, settingsValidation} from './validators/auth.js'
import checkAuth from "./utils/checkAuth.js";
import {authorizeUser, getProfile, registerUser, updateProfile, userSignout} from "./controllers/UserController.js";
import {
    getAllManga,
    getMangaById,
    getMangaByTitle,
    getMostPopularManga,
    searchManga
} from "./controllers/MangaController.js";
import {
    addFavoriteManga,
    deleteFavorite,
    getAllFavorites,
    isFavouriteById
} from "./controllers/FavouriteMangaController.js";

// db connect
mongoose.connect('mongodb+srv://mydramaclubadress:RFbWZUaZkVGyJPdJ@cluster0.a0cxyxd.mongodb.net/loveManga?retryWrites=true&w=majority&appName=Cluster0')
    .then(() =>{
        console.log('MongoDB connected');
    })
    .catch((err)=>{
        console.log(err);
    })


const app = express();

//uses
app.use(express.json());


app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//makeManga();
//mangaSeed();

//routes
app.post('/auth/login', loginValidation, authorizeUser)
app.post('/auth/register', registerValidation, registerUser)
app.get('/auth/userProfile', checkAuth , getProfile)
app.get('/auth/signout', userSignout)
app.patch('/profile/settings', settingsValidation ,checkAuth, updateProfile)
app.get('/catalogue' ,getAllManga)
app.get('/catalogue/id/:id', getMangaById)
app.get('/catalogue/title/:title', getMangaByTitle)
app.get('/catalogue/mostPopular', getMostPopularManga)
/*
app.get('/catalogue/:id/pages' , checkAuth, getMangaPages)*/

app.get("/profile/favourites", checkAuth , getAllFavorites)
app.post("/manga/add/:id", checkAuth, addFavoriteManga)
app.delete("/manga/:id", checkAuth ,deleteFavorite);
app.get("/manga/favourite/:id", checkAuth, isFavouriteById)
app.post("/manga/search", searchManga)

/*router

router.get("/manga/:id", controllers.getFavorites);

router;

router.put("/update/manga/:id", controllers.updateFavorite);

router.delete("/manga/:id", controllers.deleteFavorite);*/

app.listen(4444, (err) => {
    if (err){
        return console.log(err);
    }
    console.log('Server is running');
});

