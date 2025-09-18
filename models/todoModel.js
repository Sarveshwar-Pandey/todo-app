const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
  title: {
      type: String,
      required: [true, "Please add a title"]
    },
  description: {
      type: String
    },
  isCompleted: {
      type: Boolean,
      default: false
    },
  dueDate: {
      type: Date
    },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt automatically
  }
)

module.exports = mongoose.model("Todo",todoSchema)