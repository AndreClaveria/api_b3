const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const CompanySchema = mongoose.Schema(
    {
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
        companyName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50,
        },
        companyStatus: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 4,
        },
        companySiret: {
            type: String,
            required: true,
            minLength: 9,
            maxLength: 9,
        },
        companyAddress: {
            type: String,
            default: "12 Rue Anatole France",
        },
        companyCity: {
            type: String,
            default: "Nanterre",
        },
        companyPostal: {
            type: Number,
            default: 92000,
        },
        companyPhone: {
            type: String,
            default: "0141206957",
        },
        accountType: {
            type: String,
            default: "Company",
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
  CompanySchema.pre("save", function(next) {
    if(!this.isModified("userPassword")){
      return next();
    }
    const hashedPassword = bcrypt.hashSync(this.userPassword, 10);
    this.userPassword = hashedPassword;
    next();
  })
  
  module.exports = mongoose.model("Company", CompanySchema);