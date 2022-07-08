const { Router } = require('express');

const router = Router();

router.get('/signup', (req, res) =>{
    res.render('signUp')
})

module.exports = router;