const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
}

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' })

    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters' })

    const existing = await User.findOne({ where: { email } })
    if (existing)
      return res.status(409).json({ error: 'Email already registered' })

    const hashed = await bcrypt.hash(password, 12)
    const user = await User.create({ email, password: hashed })

    const token = generateToken(user)

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, email: user.email }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Registration failed' })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' })

    const user = await User.findOne({ where: { email } })
    if (!user)
      return res.status(401).json({ error: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match)
      return res.status(401).json({ error: 'Invalid credentials' })

    const token = generateToken(user)

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Login failed' })
  }
}