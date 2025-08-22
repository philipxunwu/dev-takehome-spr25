import mongoose from "mongoose"; 

declare global {
    var mongoose: {
        conn: mongoose.Connection | null; 
        promise: Promise<mongoose.Connection> | null; 
    };
};

const MONGODB_URI: string | undefined = process.env.MONGODB_URI; 

let cached = global.mongoose; 

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }; 
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn; 
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false 
        }

        cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
            return mongoose.connection;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; 
        throw e;
    }



    return cached.conn;
}

export default dbConnect; 