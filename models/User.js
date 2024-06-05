import * as mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true
    },
    avatarUrl: String,
    userDescription: String
},
    {
        timestamps: true
    });

export default mongoose.model('Users', UsersSchema);


