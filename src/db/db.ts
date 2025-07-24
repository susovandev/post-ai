import { config } from '@/config/_config';
import mongoose from 'mongoose';

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(config.DATABASE_URL);
        console.log('Connected to MongoDB');
        console.log(
            `Database name: ${connectionInstance.connection.db?.databaseName}`,
        );
        console.log(`Database host: ${connectionInstance.connection.host}`);
        console.log(`Database port: ${connectionInstance.connection.port}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectToDB;
