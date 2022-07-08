const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')

//creo mi app servidor
const app = express()

//Le digo donde van a estar mis templates y prendo el motor
app.set('views', './views')
app.set('view engine', 'ejs')

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'key',
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: MongoStore.create({mongoUrl:'mongodb+srv://Mariela:mongo1991@cluster0.ashm8.mongodb.net/?retryWrites=true&w=majority'}),
    cookie: { maxAge: 30000}
}))


//empiezo el server
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});

server.on('error', error => console.log(`Error en el servidor ${error}`))