import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
    PORT: process.env.PORT || 8080,
    DATABASE : {
        MONGO_URL : process.env.MONGO_URL,
    },
    AUTH: {
        SECRET: process.env.SECRET,
    },
}