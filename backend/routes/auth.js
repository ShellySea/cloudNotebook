const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'SailySecret';

// ROUTE 1:Create a User using: POST "/api/auth/createuser". No login required
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
            res.status(500).send({ error: 'Internal Server Error' })
        }
    })

// ROUTE 2:Authenticate a User using: POST "api/auth/login".No Login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        let success = false;
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Fetch logged in user details:POST:"api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router


/**
 validusers :
 {
  "email": "saurj@mail.com",
  "password": "33133"
}
{
  "email":"sailyj@mail.com",
    "password":"mypass!@#"
}
skythakur@gmail.com,sky123
sailyjadhav@gmail.com ,sai123
sss@gmail.com,sai123 *imp
 */