const mongoose = require("mongoose");

const MissionSchema = mongoose.Schema(
  {
    missionCreator: {
        type: String,
        required: true
    },
    startingDate: {
        type: Date,
        required: true
    },
    endingDate: {
        type: Date,
        required: true
    },
    missionPrice: {
        type: Number,
        required: true,
    },
    missionDescription: {
        type: String,
        required: true,
        minLength: 10,
    },
    missionTitle: {
        type: String,
        required: true,
        minLength: 4,
    },
    missionProfessions: [{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "profession",
    }],
    missionSkills: [
        {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "skills",
        }
    ],
    missionStatus: {
        type: String,
        required: true,
        default: "En cours"
    },
    missionPeople: [
        {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Freelance",
            status: { type : String, enum: ["accepted", "refused", "pending"], default : 'pending'}
        }
    ]
       
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("mission", MissionSchema);