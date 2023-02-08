const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = mongoose.Schema(
    {
        adminName: {
            type: String,
            required: true,
            lowercase: true,
            minLength: 3,
            maxLength: 20,
        },
        userMail: {
            type: String,
            lowercase: true,
            unique: true,
            required: true,
        },
        userPassword: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 50,
        },
        accountType: {
            type: String,
            default: "Admin"
        },
        isAdmin: {
            type: Boolean,
            default: true,
        },

    },
    {
        timestamps: true,
    }
);

AdminSchema.pre("save", function(next) {
    if(!this.isModified("userPassword")){
      return next();
    }
    const hashedPassword = bcrypt.hashSync(this.userPassword, 10);
    this.userPassword = hashedPassword;
    next();
  })
  
module.exports = mongoose.model("Admin", AdminSchema);