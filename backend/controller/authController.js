const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

exports.register = async (req, res) => {
    try {
        console.log('=== REGISTRATION DEBUG ===');
        console.log('Request body:', req.body);
        console.log('Request headers:', req.headers);
        
        const {username, email, password} = req.body;
        console.log('Extracted data:', {username, email, password: password ? '[PRESENT]' : '[MISSING]'});
        
        if (!username || !email || !password) {
            console.log('Validation failed - missing fields');
            return res.status(400).json({
                message: "Registration failed",
                error: "Username, email, and password are required"
            });
        }
        
        console.log('About to hash password...');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');
        
        console.log('About to create user with data:', {username, email, password: '[HASHED]'});
        const user = await User.create({username, email, password: hashedPassword});
        console.log('User created successfully:', {id: user.id, username: user.username, email: user.email});
        
        res.json({
            message: "User registered successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err){
        console.error('=== REGISTRATION ERROR ===');
        console.error('Error message:', err.message);
        console.error('Error name:', err.name);
        console.error('Error stack:', err.stack);
        if (err.sql) {
            console.error('SQL query:', err.sql);
        }
        if (err.parameters) {
            console.error('SQL parameters:', err.parameters);
        }
        console.error('Full error object:', err);
        console.error('========================');
        
        res.status(500).json({
            message: "Registration failed",
            error: err.message || "Error registering the user"
        });
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user) return res.status(400).json({error: "User not found"});

        const isvalid = await bcrypt.compare(password, user.password);
        if(!isvalid) return res.status(401).json({error: "Invalid credentials"});

        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, 
        {expiresIn: '1d'});

        res.json({token});
    } catch(err){
        res.status(500).json({error: "Error logging in the user"});
    }
}