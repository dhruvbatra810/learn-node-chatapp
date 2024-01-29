import express from 'express'
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import {chats} from "./dummydata/data"
import dotenv from "dotenv"
import path from "path"

const app = express();

const envFilePath = path.resolve(__dirname,'..', 'configs', `.env.${process.env.NODE_ENV}`);

const fallbackEnvFilePath = path.resolve(__dirname,'..','configs', '.env');

require('dotenv').config({ path: envFilePath || fallbackEnvFilePath });

app.use(cors({credentials: true}))


app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.get('/',(req,res)=> {
    res.send("Api is running")
});
app.get('/chats',(req,res) =>{
    res.send(chats)
})
app.get('/chats/:id',(req,res)=>{
   console.log(req.params.id)
   const singlechat = chats.find((c)=>{return c._id === req.params.id})
   console.log(singlechat)
   if(singlechat)
        res.send(singlechat)
    res.send("chat not found")
})
const server = http.createServer(app)
server.listen(process.env.HTTP_PORT || 5000,()=>{
    console.log(`server running on port ${process.env.HTTP_PORT || 5000}`)
})