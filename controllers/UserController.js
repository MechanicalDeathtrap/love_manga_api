import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import FavouriteManga from "../models/FavouriteManga.js";

export const registerUser = async (req, res) =>{
    try{
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            name: req.body.name,
            email: req.body.email,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
            userDescription: req.body.userDescription,
            isAdmin: req.body.isAdmin
        })

        // create user
        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id
            },
            "mySecretKeyToken",
            {
                expiresIn: '30d'
            }
        )

        const {passwordHash, ...userData} = user._doc
        res.header("Access-Control-Allow-Origin", "*")
        res.json({
            ...userData,
            token
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться'
        });
    }
}

export const authorizeUser = async (req, res) =>{
    try{
        console.log(req.body);
        const user = await UserModel.findOne({email: req.body.email});

        if (!user){
            console.log('Пользователь не найден');
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const  isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPass){
            console.log('Неверный логин или пароль');
            return res.status(400).json({
                message: 'Неверный логин или пароль'
            })
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            "mySecretKeyToken",
            {
                expiresIn: '30d'
            }
        )

        const {passwordHash, ...userData} = user._doc

        res.header("Access-Control-Allow-Origin", "*")
        res.json({
            ...userData,
            token
        })
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться'
        });
    }
}

export const getProfile = async (req, res) =>{
    try{
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const {passwordHash, ...userData} = user._doc

        res.json({userData})
    }
    catch(err){
        res.status(403).json({
            message: 'Доступ запрещен'
        });
    }
}

export const userSignout = async (req, res) => {
    try {
        // Clear the token cookie
        // res.clearCookie("token");
        // Clear all items from local storage
        localStorage.clear();
        console.log(localStorage);

        res.status(200).json({ message: "Успешно выполнен выход из аккаунта" });
    } catch (error) {
        res.status(400).json({ message: 'Не удалось выйти из аккаунта' });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId

        const updatedProfile = await UserModel.findByIdAndUpdate(
            userId,
            req.body,
            {
                new: true,
            }
        )

        if (!updatedProfile) {
            return res.status(404).json({ error: "Пользователь не найден" })
        }

        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: 'Не удалось обновить информацию аккаунта' })
    }
}