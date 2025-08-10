import prisma from '../prismaClient.js';

export const createComment = async (req, res) => {
  const destinationId = parseInt(req.params.destinationId);
  const { content, rating, userId } = req.body;

  if (!content || !userId || isNaN(destinationId)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        rating,
        destination: { connect: { id: destinationId } },
        user: { connect: { id: userId } },
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
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to submit comment' });
  }
}

export const getCommentsByDestination = async (req, res) => {
  const destinationId = parseInt(req.params.destinationId);

  try {
    const comments = await prisma.comment.findMany({
      where: { destinationId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    });
    res.json(comments);
  } catch (error) {
    console.error('Get Comments Error:', error);
    res.status(500).json({ error: 'Failed to get comments' });
  }
};
