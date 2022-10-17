import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import bcryptjs, { hash } from 'bcryptjs'
import User from '../models/users';
import mongoose from 'mongoose';
import signJWT from '../functions/signJWT'
const NAMESPACE = "Users"
const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Token validated, user autherized");

    return res.status(200).json({
        message : "Authorized"
    })
};
const register = (req: Request, res: Response, next: NextFunction) => {
    let {username, password} = req.body;
     bcryptjs.hash(password, 10, (hashError, hash)=>{
        if(hashError){
            return res.status(500).json({
                message : hashError.message,
                error : hashError
            })
        }
        
        const _user = new User({
            _id : new mongoose.Types.ObjectId(),
            username,
            password: hash
        })
        return _user.save().then((user) =>{
            return res.status(201).json({
                user
            })
        }).catch(e=>{
            return res.status(500).json({
                message: e.message,
                e
            })
        })
        
     })
};
const login = (req: Request, res: Response, next: NextFunction) => {
    let {username, password} = req.body;

    User.find({username})
    .then(users=>{
        if(users.length!==1){
            return res.status(401).json({
                message:"unauthorized"
            })
        }
        bcryptjs.compare(password, users[0].password,(err, success)=>{
            if(err) return res.status(401).json({
                message:"unauthorized"
            })
            else if(success){
                signJWT(users[0], (_error, token)=>{
                    if(_error){
                        return res.status(401).json({
                            message:"unauthorized",
                            error:_error
                        }) 
                    }
                    else if(token){
                        return res.status(200).json({
                            message:"Auth succeful",
                            token,
                            user:users[0]
                        })
                    }
                })
            }
        })
    }).catch(e=>{
        return res.status(500).json({
            message:e.message,
            error:e
        })
    })
};
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
    .select('-password')
    .exec()
    .then(users=>{
        return res.status(200).json({
            users,
            count:users.length
        })
    }).catch(e=>{
        return res.status(500).json({
            message:e.message,
            error:e
        })
    })
    
};

export default { validateToken, register, getAllUsers, login };
