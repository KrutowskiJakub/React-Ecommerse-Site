const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { mail, password } = req.body;
    const existingUser = await User.findOne({ where: { mail } });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ mail, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
};

const loginUser = async (req, res) => {
    const { mail, password } = req.body;
    const user = await User.findOne({ where: { mail } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ mail: user.mail }, 'secret', { expiresIn: '24h' });
    res.json({ token });
};

const getAuthStatus = (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
            jwt.verify(token, 'secret');
            return res.json(true);
        } catch (error) {
            return res.json(false);
        }
    }
    res.json(false);
};

module.exports = { registerUser, loginUser, getAuthStatus };