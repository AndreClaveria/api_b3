const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const FreelanceSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            lowercase: true,
            minLength: 3,
            maxLength: 20,
        },
        lastName: {
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
            default: "Freelance",
        },
        userAddress: {
            type: String,
            default: "4 rue Charles Dickens",
        },
        userCity: {
            type: String,
            default: "Paris",
        },
        userPostal: {
            type: Number,
            default: 75016,
        },
        userPhone: {
            type: String,
            default: "0651857944",
        },
        userExp: {
            type: Number,
            required: true,
            maxLength: 3,
        },
        dailyTax: {
            type: Number,
            required: true,
        },
        skills: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "skills"
        },
        jobs: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "profession"
        },
        mission: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "mission"
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },

    },
    {
        timestamps: true,
    }
);

FreelanceSchema.pre("save", function(next) {
    if(!this.isModified("userPassword")){
      return next();
    }
    const hashedPassword = bcrypt.hashSync(this.userPassword, 10);
    this.userPassword = hashedPassword;
    next();
  })
  
module.exports = mongoose.model("Freelance", FreelanceSchema);