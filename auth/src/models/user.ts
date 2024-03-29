import mongoose from 'mongoose';

export type UserDocument = {
  email: string;
  password: string;
};

export interface UserModel extends mongoose.Model<UserDocument> {}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };
