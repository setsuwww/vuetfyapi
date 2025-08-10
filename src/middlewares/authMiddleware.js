import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) return res.status(401).json({ message: 'Token not found' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    console.error('Invalid token', err)
    res.status(403).json({ message: 'Invalid token' })
  }
}

export function verifyToken(req, res, next) {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

import jwt from 'jsonwebtoken'

export const verifyUser = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ error: 'No token' })

  try {
    const decoded = jwt.verify(token, 'your-secret-key')
    req.user = decoded
    next()
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' })
  }
}

