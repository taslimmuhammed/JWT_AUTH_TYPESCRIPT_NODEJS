import dotenv from 'dotenv';

dotenv.config();





const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPERTIME = process.env.SERVER_TOKEN_EXPERTIME || 1337;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "cooluser";
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "superencryptedsecret";

// const MONGO_CONNECT = (done : void)=>{
//     const url= 'mongodb://localhost:27017'
//     const dbname = 'shopping'
// }
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token:{
        expertime: SERVER_TOKEN_EXPERTIME,
        isssuer :SERVER_TOKEN_ISSUER,
        secret : SERVER_TOKEN_SECRET
         

    }
};

const config = {
    server: SERVER
};

export default config;
