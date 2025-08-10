const prisma = require('../prisma/client');

// Get all destinations with optional filtering
exports.getAllDestinations = async (req, res) => {
  try {
    const { search, category } = req.query;
    
    const where = {};
    
    // Filter by category if provided
    if (category) {
      where.category = {
        name: category
      };
    }
    
    // Search by name if provided
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive'
      };
    }
    
    const destinations = await prisma.destination.findMany({
      where,
      include: {
        category: {
          select: {
            name: true
          }
        },
        comments: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 5, // Limit comments per destination
          include: {
            user: {
              select: {
                username: true
              }
            }
          }
        }
      }
    });
    
    res.json(destinations);
  } catch (err) {
    console.error('Error fetching destinations:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new comment/review to a destination
exports.addComment = async (req, res) => {
  try {
    const { content, rating } = req.body;
    const destinationId = parseInt(req.params.id);
    const userId = req.user.id;
    
    if (!content || !rating) {
      return res.status(400).json({ message: 'Content and rating are required' });
    }
    
    const newComment = await prisma.comment.create({
      data: {
        content,
        rating,
        userId,
        destinationId
      },
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    });
    
    res.status(201).json(newComment);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all categories for filter dropdown
exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true
      }
    });
    
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Server error' });
  }
};