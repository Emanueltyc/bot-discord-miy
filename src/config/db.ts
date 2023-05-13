import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error: ${error}`.red.bold);
        process.exit();
    }
};

export { connectDB };
