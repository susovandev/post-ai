/**
 *
 */
import { IUserDocument } from '@/interfaces/user.interface';
import { Schema, model } from 'mongoose';

const userSchema: Schema<IUserDocument> = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            trim: true,
            lowercase: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true,
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
        totalPosts: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

userSchema.index({ username: 1, email: 1 }, { unique: true });

const userModel = model<IUserDocument>('User', userSchema);
export default userModel;
