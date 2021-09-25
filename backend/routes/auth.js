const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'SailySecret';

// Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',
    [body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
    ],
    async (req, res) => {
        // If there are errors, return bad req and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // Check whether user with this email already exists
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: 'Sorry, a user with this email already exists' });
            } else {
                const salt = await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(req.body.password, salt);
                // Create a new user
                user = await User.create({
                    name: req.body.name,
                    password: secPass,
                    email: req.body.email
                });

                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authToken = jwt.sign(data, JWT_SECRET)
                // res.json(user)
                res.json({ 'authToken': authToken })
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).send({ error: 'Some error occured' })
        }
    })

module.exports = router