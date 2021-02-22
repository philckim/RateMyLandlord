const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Manager = require('../models/Manager');

// @route   POST api/managers
// @desc    Create new property manager
// @access  Public
router.post(
    '/',
    [
        check('firstName', 'First name is required').not().isEmpty(),
        check('lastName', 'Last name is required').not().isEmpty(),
        check('email', 'Email is required and must be valid').isEmail()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email } = req.body;
        try {
            let manager = await Manager.findOne({ email });

            if(manager) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Manager already exists' }] });
            }

            manager = new Manager({
                firstName,
                lastName,
                email
            });

            await manager.save();
            return manager;

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        } 
    }
)

// @route   GET api/managers
// @desc    get all managers route
// @access  Public
router.get('/', async (req, res) => {
    try {
      const managers = await Manager.find({});
      res.json(managers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error in GET api/managers');
    }
  });

  module.exports = router;