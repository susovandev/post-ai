/**
 * External Modules
 */
import type { Document } from 'mongoose';
interface IUserDocument extends Document {
    username: string;
    email: string;
    password: string;
    posts: string[];
    totalPosts: number;
}

export { IUserDocument };
