import jwt from 'jsonwebtoken'
import config from '../config/config';
import logging from '../config/logging';
import IUser from '../interfaces/users';


const NAMESPACE = "Auth";

const signJWT = (user :IUser, callback: (error: Error | null, token :string |null)=>void):void => {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime =  timeSinceEpoch +Number(config.server.token.expertime)*1000
    var expirationTimeInSeconds = Math.floor(expirationTime/1000)

    try{
        jwt.sign({
            username:user.username
        },
        config.server.token.secret,
        {
            issuer : config.server.token.isssuer,
            algorithm:'HS256',
            expiresIn: expirationTimeInSeconds
        },
        (error, token)=>{
            if(error){
                callback(error, null)
            }
            else if(token){
                callback(null, token)
            }
        }
        )
    } catch(error:any)
    {
         logging.error(NAMESPACE,error.message, error)
         callback(error, null)
    }
}

export default signJWT