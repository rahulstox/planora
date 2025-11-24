import ForumPost from "../models/forumPost.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * @description Create a new forum post. User details are taken from the authenticated request.
 */
export const createPost = asyncHandler(async (req, res, next) => {
  // SECURITY: Get user ID and username from `req.user`, which is set by our verifyJWT middleware.
  // NEVER trust `senderName` or `userId` from the request body.
  const { _id: userId, name: username } = req.user;

  const { title, description, category, postType } = req.body;

  // Validate required fields from the body
  if (!title || !description || !category) {
    return next(
      new ApiError(400, "Title, description, and category are required fields.")
    );
  }

  const post = await ForumPost.create({
    title,
    description,
    userId, // Securely set from req.user
    username, // Securely set from req.user
    category, // Renamed from 'tag' to match schema
    postType,
    replies: [],
  });

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
});

/**
 * @description Get all forum posts, sorted by most recent.
 */
export const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await ForumPost.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "All posts fetched successfully"));
});

/**
 * @description Add a reply to a specific post.
 */
export const addReply = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { message } = req.body;
  // SECURITY: Get user details from the authenticated request.
  const { _id: userId, name: username } = req.user;

  if (!message || !message.trim()) {
    return next(new ApiError(400, "Reply message cannot be empty."));
  }

  const post = await ForumPost.findById(postId);

  if (!post) {
    return next(new ApiError(404, "Post not found with the given ID."));
  }

  const reply = { userId, username, message };
  post.replies.push(reply);
  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Reply added successfully"));
});

/**
 * @description Get all replies for a specific post by its ID.
 */
export const getRepliesByPostId = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const post = await ForumPost.findById(postId).select("replies"); // Only fetch replies for efficiency

  if (!post) {
    return next(new ApiError(404, "Post not found with the given ID."));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post.replies, "Replies fetched successfully"));
});

/**
 * @description Get posts filtered by type (e.g., question, experience).
 */
export const getPostByType = asyncHandler(async (req, res, next) => {
  const { type } = req.query;

  const allowedTypes = ["question", "experience", "review", "tip", "story"];

  // If a type is provided, it must be one of the allowed types.
  if (type && !allowedTypes.includes(type)) {
    return next(new ApiError(400, "Invalid post type specified."));
  }

  const query = type ? { postType: type } : {};
  const posts = await ForumPost.find(query).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        posts,
        `Posts of type '${type || "all"}' fetched successfully`
      )
    );
});

/**
 * @description Get a single post by its ID.
 */
export const getPostById = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const post = await ForumPost.findById(postId);

  if (!post) {
    return next(new ApiError(404, "Post not found with the given ID."));
  }

  // Increment views (optional, but good for tracking)
  post.views += 1;
  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfully"));
});
