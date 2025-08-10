import prisma from '../prismaClient.js'

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.comment.findMany({
      where: {
        rating: {
          not: null,
        },
      },
      include: {
        user: true,
        destination: true,
      },
    })
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get reviews' })
  }
}
