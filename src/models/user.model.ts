/**
 * External Modules
 */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Custom Modules
 */
import { IUserDocument } from '@/interfaces/user.interface';
import { config } from '@/config/_config';
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
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const genSalt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, genSalt);
    }
    next();
});

userSchema.methods.isPasswordMatch = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id },
        config.ACCESS_TOKEN_SECRET as jwt.Secret,
        {
            expiresIn:
                config.ACCESS_TOKEN_EXPIRES_IN as jwt.SignOptions['expiresIn'],
        },
    );
};
const userModel = model<IUserDocument>('User', userSchema);
export default userModel;
