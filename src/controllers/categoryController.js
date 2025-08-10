import prisma from '../prismaClient.js';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany()
    res.json(categories)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
}

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await prisma.category.create({ data: { name } });
  res.json(category);
};
