// Initiating environment
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
const MongoStore = require('connect-mongo');
const path = require('path');
const session = require('express-session');
const HttpException = require('./src/utils/HttpException');
const errorMiddleware = require('./src/middleware/error');
const userRouter = require('./src/routes/users');
const gameRouter = require('./src/routes/games');
const reviewRouter = require('./src/routes/reviews');
const favoriteRouter = require('./src/routes/favorites');
const adminRouter = require('./src/routes/admins');
const { globalMiddleware, checkCsurfError, csurfMiddleware } = require('./src/middleware/middleware');
// Initiating express application
const app = express();

// Set ENV variables.
const PORT = Number(process.env.PORT || 3000);
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/game-app';

// Mongoose connect and setup
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


// EJS engine setup
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Enables to receive req.body
app.use(express.urlencoded({ extended: true }));

// Allow to use methods PUT and DELETE in ejs forms.
app.use(methodOverride('_method'));

// Set content-type to be application/json
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Enables to sanitize inputs from query selector injection
app.use(mongoSanitize());

// Enable all cors requests and enable pre-flight in all routes
app.use(cors());
app.options('*', cors());

// Configurations of express session
const sessionConfig = {
    name: 'session',
    secret: process.env.SECRET,
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

// Initiating flash
app.use(flash());

// Initiating csurf
app.use(csurf());

// Csurf and Global variables Middleware
app.use(globalMiddleware);
app.use(checkCsurfError);
app.use(csurfMiddleware);

// Routes
app.use('/', userRouter);
app.use('/games', gameRouter);
app.use('/games/:id/reviews', reviewRouter);
app.use('/profiles/:id/favorites', favoriteRouter);
app.use('/admin/:id/reviews', adminRouter);

app.get('/', (req, res) => {
    res.render('home');
});

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