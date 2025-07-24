/**
 *
 */
import morgan, { StreamOptions } from 'morgan';

/**
 * Custom Modules
 */
import Logger from '@/utils/logger.js';
import { config } from './_config.js';

const stream: StreamOptions = {
    write: (message) => Logger.http(message),
};

const skip = () => {
    const env = config.NODE_ENV || 'development';
    return env !== 'development';
};

const morganConfig = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream, skip },
);

export default morganConfig;
