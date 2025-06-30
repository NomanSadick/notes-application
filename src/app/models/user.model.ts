import mongoose, { Model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethods, UserStaticMethods } from "../interfaces/user.interface";
import validator from 'validator';
import bcrypt from "bcryptjs";


const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number }
    
  },
  { _id: false } 
)

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: 3,
      maxlength: 12,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: 3,
      maxlength: 12,
    },
    age: {
        type: Number,
        required: true,
        min: [18, 'Must be at least 18, got {VALUE}'],
        max: [120, 'Must be at most 120, got {VALUE}'],
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email must be unique'],
      lowercase: true,
      trim: true,
      // validate: {
      //   validator: function (value) {
      //     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      //   },
      //   message: props => `${props.value} is not a valid email address`
      // }
      validate: [validator.isEmail, 'Invalid email address {VALUE}']
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      uppercase: true,
      enum: {
        values: ["USER", "ADMIN", "SUPER_ADMIN"],
        message: '{VALUE} is not a valid role'
      },
      default: "USER",
    },
    address: {
      type: addressSchema,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.method("hashPassword", async function(plainPassword: string){
    const password = await bcrypt.hash(plainPassword, 10);
        
    return password;
})

userSchema.static("hashPassword", async function(plainPassword: string){
    const password = await bcrypt.hash(plainPassword, 10);
        
    return password;
})

export const User = mongoose.model<IUser, UserStaticMethods>("User", userSchema);
