const CommunityPost = require('../models/CommunityPost');
const ProjectFriday = require('../models/ProjectFriday');
const asyncHandler = require('express-async-handler');

// @desc    Get all community posts
// @route   GET /api/community/posts
// @access  Public
const getCommunityPosts = asyncHandler(async (req, res) => {
  const posts = await CommunityPost.find({}).populate('author', 'name');
  res.json(posts);
});

// @desc    Get community post by ID
// @route   GET /api/community/posts/:id
// @access  Public
const getCommunityPostById = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id).populate('author', 'name');

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Community post not found');
  }
});

// @desc    Create a community post
// @route   POST /api/community/posts
// @access  Private
const createCommunityPost = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    category,
    image,
    isLostItem,
    isFoundItem,
    itemStatus,
    location,
    contactInfo,
  } = req.body;

  const post = new CommunityPost({
    title,
    content,
    category,
    image,
    isLostItem,
    isFoundItem,
    itemStatus,
    location,
    contactInfo,
    author: req.user._id,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @desc    Update a community post
// @route   PUT /api/community/posts/:id
// @access  Private
const updateCommunityPost = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    category,
    image,
    isLostItem,
    isFoundItem,
    itemStatus,
    location,
    contactInfo,
  } = req.body;

  const post = await CommunityPost.findById(req.params.id);

  if (post) {
    // Check if user is author
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    post.image = image || post.image;
    post.isLostItem = isLostItem || post.isLostItem;
    post.isFoundItem = isFoundItem || post.isFoundItem;
    post.itemStatus = itemStatus || post.itemStatus;
    post.location = location || post.location;
    post.contactInfo = contactInfo || post.contactInfo;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Community post not found');
  }
});

// @desc    Delete a community post
// @route   DELETE /api/community/posts/:id
// @access  Private
const deleteCommunityPost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);

  if (post) {
    // Check if user is author
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    await post.remove();
    res.json({ message: 'Community post removed' });
  } else {
    res.status(404);
    throw new Error('Community post not found');
  }
});

// @desc    Like a community post
// @route   PUT /api/community/posts/:id/like
// @access  Private
const likeCommunityPost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);

  if (post) {
    // Check if user already liked the post
    const alreadyLiked = post.likes.find(
      (like) => like.user.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      // Remove like
      post.likes = post.likes.filter(
        (like) => like.user.toString() !== req.user._id.toString()
      );
    } else {
      // Add like
      post.likes.push({ user: req.user._id });
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Community post not found');
  }
});

// @desc    Add comment to community post
// @route   POST /api/community/posts/:id/comment
// @access  Private
const commentOnCommunityPost = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const post = await CommunityPost.findById(req.params.id);

  if (post) {
    const comment = {
      text,
      user: req.user._id,
    };

    post.comments.push(comment);
    const updatedPost = await post.save();
    res.status(201).json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Community post not found');
  }
});

// @desc    Get all Project Friday stories
// @route   GET /api/community/project-friday
// @access  Public
const getProjectFridayStories = asyncHandler(async (req, res) => {
  const stories = await ProjectFriday.find({ isVerified: true }).populate('author', 'name');
  res.json(stories);
});

// @desc    Get Project Friday story by ID
// @route   GET /api/community/project-friday/:id
// @access  Public
const getProjectFridayStoryById = asyncHandler(async (req, res) => {
  const story = await ProjectFriday.findById(req.params.id).populate('author', 'name');

  if (story) {
    res.json(story);
  } else {
    res.status(404);
    throw new Error('Project Friday story not found');
  }
});

// @desc    Create a Project Friday story
// @route   POST /api/community/project-friday
// @access  Private
const createProjectFridayStory = asyncHandler(async (req, res) => {
  const {
    studentName,
    branch,
    year,
    description,
    helpReceived,
    contactInfo,
  } = req.body;

  const story = new ProjectFriday({
    studentName,
    branch,
    year,
    description,
    helpReceived,
    contactInfo,
    author: req.user._id,
  });

  const createdStory = await story.save();
  res.status(201).json(createdStory);
});

// @desc    Update a Project Friday story
// @route   PUT /api/community/project-friday/:id
// @access  Private
const updateProjectFridayStory = asyncHandler(async (req, res) => {
  const {
    studentName,
    branch,
    year,
    description,
    helpReceived,
    contactInfo,
  } = req.body;

  const story = await ProjectFriday.findById(req.params.id);

  if (story) {
    // Check if user is author
    if (story.author.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    story.studentName = studentName || story.studentName;
    story.branch = branch || story.branch;
    story.year = year || story.year;
    story.description = description || story.description;
    story.helpReceived = helpReceived || story.helpReceived;
    story.contactInfo = contactInfo || story.contactInfo;

    const updatedStory = await story.save();
    res.json(updatedStory);
  } else {
    res.status(404);
    throw new Error('Project Friday story not found');
  }
});

// @desc    Delete a Project Friday story
// @route   DELETE /api/community/project-friday/:id
// @access  Private
const deleteProjectFridayStory = asyncHandler(async (req, res) => {
  const story = await ProjectFriday.findById(req.params.id);

  if (story) {
    // Check if user is author
    if (story.author.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    await story.remove();
    res.json({ message: 'Project Friday story removed' });
  } else {
    res.status(404);
    throw new Error('Project Friday story not found');
  }
});

// @desc    Like a Project Friday story
// @route   PUT /api/community/project-friday/:id/like
// @access  Private
const likeProjectFridayStory = asyncHandler(async (req, res) => {
  const story = await ProjectFriday.findById(req.params.id);

  if (story) {
    // Check if user already liked the story
    const alreadyLiked = story.likes.find(
      (like) => like.user.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      // Remove like
      story.likes = story.likes.filter(
        (like) => like.user.toString() !== req.user._id.toString()
      );
    } else {
      // Add like
      story.likes.push({ user: req.user._id });
    }

    const updatedStory = await story.save();
    res.json(updatedStory);
  } else {
    res.status(404);
    throw new Error('Project Friday story not found');
  }
});

// @desc    Add comment to Project Friday story
// @route   POST /api/community/project-friday/:id/comment
// @access  Private
const commentOnProjectFridayStory = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const story = await ProjectFriday.findById(req.params.id);

  if (story) {
    const comment = {
      text,
      user: req.user._id,
    };

    story.comments.push(comment);
    const updatedStory = await story.save();
    res.status(201).json(updatedStory);
  } else {
    res.status(404);
    throw new Error('Project Friday story not found');
  }
});

module.exports = {
  getCommunityPosts,
  getCommunityPostById,
  createCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
  likeCommunityPost,
  commentOnCommunityPost,
  getProjectFridayStories,
  getProjectFridayStoryById,
  createProjectFridayStory,
  updateProjectFridayStory,
  deleteProjectFridayStory,
  likeProjectFridayStory,
  commentOnProjectFridayStory,
};