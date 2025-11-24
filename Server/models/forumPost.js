import mongoose from 'mongoose';

const replySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
); // Ensure replies get their own _id

const forumPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: "general",
    },
    postType: {
      type: String,
      enum: ["question", "experience", "review", "tip", "story"],
      default: "question",
    },
    replies: [replySchema],
    views: {
      type: Number,
      default: 0,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ForumPost = mongoose.model("ForumPost", forumPostSchema);

export default ForumPost;
