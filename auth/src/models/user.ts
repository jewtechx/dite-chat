import { Model, Schema, model } from 'mongoose';

export type UserDocument = Document & {
  email: string;
  password: string;
};

export interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});
const User = model<UserDocument, UserModel>('User', userSchema);

export default User;
