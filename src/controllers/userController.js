import prisma from '../prismaClient.js';

export const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({ include: { comments: true } });
  res.json(users);
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil user saat ini' })
  }
}
