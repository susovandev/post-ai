import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const _config = {
    NODE_ENV: process.env.NODE_ENV?.trim() || 'development',
    PORT: Number(process.env.PORT) || 4000,
    DATABASE_URL: process.env.DATABASE_URL as string,
};

export const config = Object.freeze(_config);
