const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/communityController');
const { protect } = require('../middleware/auth');

// Community Posts routes
router.route('/posts')
  .get(getCommunityPosts)
  .post(protect, createCommunityPost);

router.route('/posts/:id')
  .get(getCommunityPostById)
  .put(protect, updateCommunityPost)
  .delete(protect, deleteCommunityPost);

router.route('/posts/:id/like')
  .put(protect, likeCommunityPost);

router.route('/posts/:id/comment')
  .post(protect, commentOnCommunityPost);

// Project Friday routes
router.route('/project-friday')
  .get(getProjectFridayStories)
  .post(protect, createProjectFridayStory);

router.route('/project-friday/:id')
  .get(getProjectFridayStoryById)
  .put(protect, updateProjectFridayStory)
  .delete(protect, deleteProjectFridayStory);

router.route('/project-friday/:id/like')
  .put(protect, likeProjectFridayStory);

router.route('/project-friday/:id/comment')
  .post(protect, commentOnProjectFridayStory);

module.exports = router;