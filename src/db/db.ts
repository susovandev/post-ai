/**
 * External Modules
 */
import mongoose from 'mongoose';

/**
 * Custom Module
 */
import { config } from '@/config/_config';
import Logger from '@/utils/logger';

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(config.DATABASE_URL);
        Logger.info('Connected to MongoDB');
        Logger.info(
            `Database name: ${connectionInstance.connection.db?.databaseName}`,
        );
        Logger.info(`Database host: ${connectionInstance.connection.host}`);
        Logger.info(`Database port: ${connectionInstance.connection.port}`);
    } catch (error) {
        Logger.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectToDB;
