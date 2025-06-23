import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';

let server: Server
let port = 8000;

async function main() {
    try  {
         await mongoose.connect('mongodb+srv://testuser111:testuser111@cluster0.rbbqn.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0');
         console.log("Connected to MongoDB using Mongoose");
        server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

main();