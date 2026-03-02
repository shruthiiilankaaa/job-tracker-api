const Job = require('../models/Job');

// @POST /api/jobs — Add a new job
const createJob = async (req, res) => {
  try {
    const { companyName, role, status, appliedDate, notes } = req.body;

    const job = await Job.create({
      userId: req.user._id,
      companyName,
      role,
      status,
      appliedDate,
      notes,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/jobs — Get all jobs for logged in user
const getJobs = async (req, res) => {
  try {
    const { status, company, page = 1, limit = 10 } = req.query;

    let filter = { userId: req.user._id };

    if (status) filter.status = status;
    if (company) filter.companyName = { $regex: company, $options: 'i' };

    const total = await Job.countDocuments(filter);
    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      jobs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/jobs/stats — Get stats for logged in user
const getStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Format into a clean object
    const formatted = {
      Applied: 0,
      OA: 0,
      Interview: 0,
      Rejected: 0,
      Offer: 0,
      total: 0,
    };

    stats.forEach((s) => {
      formatted[s._id] = s.count;
      formatted.total += s.count;
    });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @PUT /api/jobs/:id — Update a job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Make sure the job belongs to the logged in user
    if (job.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @DELETE /api/jobs/:id — Delete a job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Make sure the job belongs to the logged in user
    if (job.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await job.deleteOne();

    res.json({ message: 'Job removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createJob, getJobs, getStats, updateJob, deleteJob };