import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import { CONFIG } from './config/index';
import router from './router/index'

const app = express();

app.use(cors({
    credentials: true,
}));


app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(CONFIG.PORT, ()=> {
    console.log(`Listening to server on http://localhost:`+CONFIG.PORT);
})

mongoose.Promise = Promise;
mongoose.connect(CONFIG.DATABASE.MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());