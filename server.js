if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const cors = require('cors');
const csurf = require('csurf');
const dotenv = require('dotenv');
const engine = require('ejs-mate');
const express = require('express');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
const session = require('express-session');
const HttpException = require('./src/utils/HttpException');
const errorMiddleware = require('./src/middleware/error');
const userRouter = require('./src/routes/users');
const { globalMiddleware, checkCsurfError, csurfMiddleware } = require('./src/middleware/middleware');
//const { default: axios } = require('axios');

const app = express();

// Set PORT variable.
const PORT = Number(process.env.PORT || 3000);


const MongoStore = require('connect-mongo');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/game-app';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log('Connected to the mongoDB database.');
        app.emit('ready!');
    })
    .catch(e => console.log(e));


app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Enables to receive req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());
app.use(cors());
app.options('*', cors());

const sessionConfig = {
    name: 'session',
    secret: 'akasdfj0úajksaid923i19313qv  qwf qwer qwer qewr asdasdasda a6()',
    store: MongoStore.create({ mongoUrl: dbUrl }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
        maxAge: (1000 * 60 * 60 * 24 * 7)
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(csurf());

// Csurf Middleware
app.use(globalMiddleware);
app.use(checkCsurfError);
app.use(csurfMiddleware);

// User Route
app.use('/', userRouter);

// Home Route
app.get('/', (req, res) => {
    res.render('home');
});

// Error Route
app.all('*', (req, res, next) => {
    const error = new HttpException(404, 'Page Not Found!');
    next(error);
});

// Error management middleware
app.use(errorMiddleware);

// Running server
app.on('ready!', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}!`);
    });
});

// axios({
//     method: 'post',
//     url: 'https://api.igdb.com/v4/games',
//     headers: {
//         'Client-ID': process.env.TWITCH_CLIENT_ID,
//         'Authorization': `Bearer ${process.env.TWITCH_APP_ACCESS_TOKEN}`,
//         'Accept': 'application/json'
//     },
//     data: 'fields cover.*; limit 5;'
// })
//     .then(res => console.log(res.data))
//     .catch(err => console.log(err))