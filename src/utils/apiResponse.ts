/**
 * External Modules
 */
import { StatusCodes } from 'http-status-codes';

class ApiResponse<T> {
    public status: boolean;
    constructor(
        public statusCode: number,
        public message: string,
        public data?: T,
    ) {
        this.statusCode = statusCode || StatusCodes.OK;
        this.message = message || '';
        this.data = data;
        this.status = statusCode < 400;
    }
}

export default ApiResponse;
