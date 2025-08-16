
import {Application} from 'express'
import connectDB from './config/mongo.config'
import express from 'express'
import http from "http";
import 'dotenv/config'
import RabbitMQClient from './messaging/rabbitmq/client'
import { grpcServer } from './grpc-connection/grpc.server';

const PORT=process.env.PORT

class App {
    public app:Application;
    public server;
    constructor() {
        this.app=express()
        this.server=http.createServer(this.app)
        this.server.listen(PORT,()=>{
            console.log(`server running on http://localhost:${PORT}`);
            
        })

        RabbitMQClient.initialize()
        grpcServer()
        connectDB()
    }
}

export default App