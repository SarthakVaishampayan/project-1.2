const GamingParlour = require('../models/GamingParlour');

// @desc    Get all gaming parlours
// @route   GET /api/parlours
// @access  Public
exports.getParlours = async (req, res) => {
  try {
    const parlours = await GamingParlour.find();

    res.status(200).json({
      success: true,
      count: parlours.length,
      data: parlours
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get single gaming parlour
// @route   GET /api/parlours/:id
// @access  Public
exports.getParlour = async (req, res) => {
  try {
    const parlour = await GamingParlour.findById(req.params.id);

    if (!parlour) {
      return res.status(404).json({
        success: false,
        message: 'Gaming parlour not found'
      });
    }

    res.status(200).json({
      success: true,
      data: parlour
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Create new gaming parlour
// @route   POST /api/parlours
// @access  Private
exports.createParlour = async (req, res) => {
  try {
    // Add owner to req.body
    req.body.owner = req.user.id;

    const parlour = await GamingParlour.create(req.body);

    res.status(201).json({
      success: true,
      data: parlour
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update gaming parlour
// @route   PUT /api/parlours/:id
// @access  Private
exports.updateParlour = async (req, res) => {
  try {
    let parlour = await GamingParlour.findById(req.params.id);

    if (!parlour) {
      return res.status(404).json({
        success: false,
        message: 'Gaming parlour not found'
      });
    }

    // Make sure user is parlour owner
    if (parlour.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this parlour'
      });
    }

    parlour = await GamingParlour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: parlour
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete gaming parlour
// @route   DELETE /api/parlours/:id
// @access  Private
exports.deleteParlour = async (req, res) => {
  try {
    const parlour = await GamingParlour.findById(req.params.id);

    if (!parlour) {
      return res.status(404).json({
        success: false,
        message: 'Gaming parlour not found'
      });
    }

    // Make sure user is parlour owner
    if (parlour.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this parlour'
      });
    }

    await parlour.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Search gaming parlours
// @route   GET /api/parlours/search
// @access  Public
exports.searchParlours = async (req, res) => {
  try {
    const { q, location, minPrice, maxPrice, consoles } = req.query;

    let query = {};

    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    if (consoles) {
      query.consoles = { $in: consoles.split(',') };
    }

    const parlours = await GamingParlour.find(query);

    res.status(200).json({
      success: true,
      count: parlours.length,
      data: parlours
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}; 