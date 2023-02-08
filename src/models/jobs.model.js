const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
    jobName: {
    type: String,
    lowercase: true,
    required: true,
    minLength: 3,
    maxLength: 50
  }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model("jobs", JobSchema);