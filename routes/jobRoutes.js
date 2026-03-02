const express = require('express');
const router = express.Router();
const { createJob, getJobs, getStats, updateJob, deleteJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

// All routes below are protected — must be logged in
router.use(protect);

router.post('/', createJob);
router.get('/', getJobs);
router.get('/stats', getStats);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;