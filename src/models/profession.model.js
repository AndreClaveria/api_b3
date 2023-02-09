const mongoose = require("mongoose");

const ProfessionSchema = mongoose.Schema({
    professionName: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 50
  }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model("profession", ProfessionSchema);