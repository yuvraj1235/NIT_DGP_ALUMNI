import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URL!);
        const connection =mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDB connected successfully");
            
        })
        connection.on('error',(err)=>{
            console.log("MONGO db connection failled:",err);
            process.exit;
            
        })
    } catch (error) {
        console.log("Something went wrong whilte db connection");
        console.log(error);
        
    }
}