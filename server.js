if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const csurf = require('csurf');
const flash = require('connect-flash');
const HttpException = require('./src/utils/HttpException');
const errorMiddleware = require('./src/middleware/error');
const userRouter = require('./src/routes/users');
//const { default: axios } = require('axios');

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use(flash());

const port = Number(process.env.PORT || 3000);

// User Route
app.use('/users', userRouter);

// Home Route
app.get('/', (req, res) => {
    res.render('home');
});

// Error Route
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Page Not Found!');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
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

// const express = require('express');
// const path = require('path');
// const app = express();
// const mongoose = require('mongoose');
// const engine = require('ejs-mate');
// const session = require('express-session');
// const ExpressError = require('./public/assets/js/ExpressError');
// const methodOverride = require('method-override');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const User = require('./src/models/user');
// //const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-sanitize');
// const userRoutes = require('./src/routes/users');
// const contactRoutes = require('./src/routes/contacts');
// const csrf = require('csurf');
// const { globalMiddleware, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// const MongoStore = require('connect-mongo');

// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/contact-list';

// mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// })
//     .then(() => {
//         console.log('Connected to the database.');
//         app.emit('ready!');
//     })
//     .catch(e => console.log(e));

// app.engine('ejs', engine);
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'src', 'views'));

// // Enables to receive req.body
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(mongoSanitize());

// const sessionOptions = session({
//     secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()',
//     store: MongoStore.create({ mongoUrl: dbUrl }),
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
//         maxAge: (1000 * 60 * 60 * 24 * 7),
//         httpOnly: true
//     }
// });
// app.use(sessionOptions);

// app.use(csrf());
// // Our Middlewares
// app.use(globalMiddleware);
// app.use(checkCsrfError);
// app.use(csrfMiddleware);

// app.on('ready!', () => {
//     app.listen(port, () => {
//         console.log(`Server has been executed on port ${port}!`);
//     });
// });