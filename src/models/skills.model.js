const mongoose = require("mongoose");

const SkillSchema = mongoose.Schema({
    skillName: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 2,
    maxLength: 50
  }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model("skills", SkillSchema);