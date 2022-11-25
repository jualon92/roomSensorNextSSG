import mongoose from 'mongoose'; 
 

 
 

type Options = {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  bufferCommands: boolean;
  autoIndex: boolean;
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts: Options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      autoIndex: true,
    };

    cached.promise = mongoose
      .connect(`${process.env.MONGODB_URI}` , opts)
      .then((mongoose) => {
        console.log("conectado")
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
