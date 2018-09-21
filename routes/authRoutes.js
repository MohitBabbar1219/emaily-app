const passport = require('passport');
const express = require('express')
const router = express.Router();

// route for logging in via google
router.get('/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)

// route for google callback verification
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.send("kdlasnlkas");
});

router.get('/current_user', (req, res) => {
    res.json(req.user);
})

module.exports = router;