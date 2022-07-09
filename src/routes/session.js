const { Router } = require('express');

const router = Router();

const usuarios = [];

router.get('/signup', (req, res) =>{
    res.render('signUp')
})

router.post('/signUp', (req, res) => {
    usuarios.push(req.body)
    res.render('logIn')
})

router.post('/logIn', (req, res) => {
    const { userV, passwordV } = req.body;

    const usuario = usuarios.find(usuario => usuario.user === userV)
    if(usuario && usuario.password === passwordV){
        for (const key in req.body) {  //Para cada prop en req.body crear una prop cpn ese nombre en session y meterle el valor de esa prop 
            req.session[key] = req.body[key];
        }
        res.redirect('/session/bienvenido');
    }
    else{
        res.render('errorLogin')
    }
})

router.get('/logIn', (req, res) => {
    res.render('logIn')
})

router.get('/bienvenido', (req, res) => {
    if(req.session.userV){
        res.render('bienvenido', {userName: req.session.userV})
    }
    else{
        res.redirect('/session/logIn')
    }
})

router.get('/logOut', (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.json({status: 'logout ERROR'})
        }
        })
    res.redirect('/session/logIn')
})


module.exports = router;