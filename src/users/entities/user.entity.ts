import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = UserEntity & Document;

@Schema()
export class Address {
  @Prop()
  country: string;
  @Prop()
  state: string;
  @Prop()
  city: string;
}

@Schema({ timestamps: true, _id: true, id: true })
export class UserEntity {
  @Prop()
  id?: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  identityFile?: string;

  @Prop()
  addressFile?: string;

  @Prop()
  email?: string;

  @Prop()
  password?: string;

  @Prop()
  gradeLevel?: string;

  @Prop()
  gender?: string;

  @Prop()
  organization?: string;

  @Prop()
  completed?: boolean;

  @Prop()
  normalizedAddress?: string;

  @Prop()
  address?: string;

  @Prop({ default: false })
  isDeleted?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.pre('find', function () {
  this.where({ isDeleted: false });
});

UserSchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(
  password: string,
) {
  return bcrypt.compare(password, this.password);
};
