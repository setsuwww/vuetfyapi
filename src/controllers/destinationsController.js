import prisma from '../prismaClient.js';

export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany({
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 3,
        },
        category: true,
      },
    })
    res.json(destinations)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get destinations' })
  }
}

export const getDestinationById = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const destination = await prisma.destination.findUnique({
      where: { id },
      include: { category: true },
    })
    if (!destination) return res.status(404).json({ error: 'Not found' })
    res.json(destination)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch destination' })
  }
}

export const createDestination = async (req, res) => {
  try {
    const { name, location, image, rating, category, description } = req.body;

    const categoryName = category?.trim() || 'All';

    let categoryData = await prisma.category.findUnique({
      where: { name: categoryName }
    });

    if (!categoryData) {
      categoryData = await prisma.category.create({
        data: { name: categoryName }
      });
    }

    const destination = await prisma.destination.create({
      data: {
        name,
        location,
        image: image || null,
        rating: parseFloat(rating),
        description: description || null,
        categoryId: categoryData.id,
      }
    });

    res.status(201).json(destination);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add destination' });
  }
}

export const getDestinationWithRating = async (req, res) => {
  const id = parseInt(req.params.id)

  try {
    const destination = await prisma.destination.findUnique({
      where: { id },
      include: {
        comments: {
          select: { rating: true }
        }
      }
    })

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' })
    }

    const ratings = destination.comments.map(c => c.rating)
    const averageRating =
      ratings.length > 0
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : 0

    res.json({
      ...destination,
      rating: Number(averageRating.toFixed(1))
    })
  } catch (error) {
    console.error('Fetch destination error:', error)
    res.status(500).json({ error: 'Failed to fetch destination' })
  }
}
